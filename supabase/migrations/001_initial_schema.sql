-- ============================================
-- Vision Hub Database Schema
-- Run this in Supabase SQL Editor
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. Users (handled by Supabase Auth)
-- Profiles table for extra user data
-- ============================================
CREATE TABLE IF NOT EXISTS profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    full_name TEXT,
    phone TEXT,
    avatar_url TEXT,
    role TEXT DEFAULT 'client' CHECK (role IN ('client', 'admin')),
    preferred_lang TEXT DEFAULT 'ar' CHECK (preferred_lang IN ('ar', 'en', 'fr')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, role)
    VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', 'client');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- 2. Orders
-- ============================================
CREATE TABLE IF NOT EXISTS orders (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    service_type TEXT NOT NULL CHECK (service_type IN ('revive', 'frameai', 'lens_coach', 'academy')),
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'ai_processing', 'human_review', 'completed', 'cancelled')),
    price DECIMAL(10,2),
    payment_status TEXT DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid', 'paid', 'refunded')),
    payment_method TEXT CHECK (payment_method IN ('stripe', 'paypal', 'bank_transfer')),
    transaction_id TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ
);

-- ============================================
-- 3. Images
-- ============================================
CREATE TABLE IF NOT EXISTS images (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    original_url TEXT NOT NULL,
    ai_processed_url TEXT,
    final_url TEXT,
    file_size INTEGER,
    mime_type TEXT,
    upload_date TIMESTAMPTZ DEFAULT NOW(),
    auto_delete_date TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '30 days'),
    is_deleted BOOLEAN DEFAULT FALSE
);

-- ============================================
-- 4. Revive Requests
-- ============================================
CREATE TABLE IF NOT EXISTS revive_requests (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    enhancements JSONB DEFAULT '{}',
    ai_result_url TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'ai_done', 'human_done')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 5. Brand Designs (FrameAI)
-- ============================================
CREATE TABLE IF NOT EXISTS brand_designs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    questionnaire JSONB NOT NULL,
    ai_designs JSONB DEFAULT '[]',
    selected_designs JSONB DEFAULT '[]',
    final_design_url TEXT,
    status TEXT DEFAULT 'questionnaire' CHECK (status IN ('questionnaire', 'ai_generating', 'admin_review', 'client_selection', 'finalized')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 6. Lens Analysis
-- ============================================
CREATE TABLE IF NOT EXISTS lens_analysis (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    image_id UUID REFERENCES images(id) ON DELETE CASCADE,
    ai_score DECIMAL(3,2),
    ai_feedback JSONB,
    human_analysis TEXT,
    video_url TEXT,
    status TEXT DEFAULT 'ai_done' CHECK (status IN ('ai_done', 'requested_human', 'human_done')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 7. Courses
-- ============================================
CREATE TABLE IF NOT EXISTS courses (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title_ar TEXT NOT NULL,
    title_en TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description_ar TEXT,
    description_en TEXT,
    level TEXT NOT NULL CHECK (level IN ('basic', 'advanced')),
    thumbnail_url TEXT,
    price DECIMAL(10,2) DEFAULT 0,
    is_free BOOLEAN DEFAULT FALSE,
    video_provider TEXT DEFAULT 'vimeo',
    video_url TEXT,
    duration_minutes INTEGER,
    ai_content JSONB,
    is_published BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 8. User Progress
-- ============================================
CREATE TABLE IF NOT EXISTS user_progress (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    completion_pct DECIMAL(5,2) DEFAULT 0,
    quiz_scores JSONB DEFAULT '[]',
    certificate_url TEXT,
    completed_at TIMESTAMPTZ,
    UNIQUE(user_id, course_id)
);

-- ============================================
-- 9. Notifications
-- ============================================
CREATE TABLE IF NOT EXISTS notifications (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (type IN ('email', 'whatsapp', 'push')),
    title TEXT,
    message TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    sent_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 10. SEO Meta
-- ============================================
CREATE TABLE IF NOT EXISTS seo_meta (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    page_path TEXT UNIQUE NOT NULL,
    meta_title_ar TEXT,
    meta_title_en TEXT,
    meta_desc_ar TEXT,
    meta_desc_en TEXT,
    og_image TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- Row Level Security (RLS)
-- ============================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE images ENABLE ROW LEVEL SECURITY;
ALTER TABLE revive_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE brand_designs ENABLE ROW LEVEL SECURITY;
ALTER TABLE lens_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Profiles policies
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON profiles;
CREATE POLICY "Public profiles are viewable by everyone"
    ON profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile"
    ON profiles FOR UPDATE USING (auth.uid() = id);

-- Orders policies
DROP POLICY IF EXISTS "Users can view own orders" ON orders;
CREATE POLICY "Users can view own orders"
    ON orders FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create orders" ON orders;
CREATE POLICY "Users can create orders"
    ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admin can view all orders" ON orders;
CREATE POLICY "Admin can view all orders"
    ON orders FOR SELECT USING (
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
    );

-- Images policies
DROP POLICY IF EXISTS "Users can view own images" ON images;
CREATE POLICY "Users can view own images"
    ON images FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can upload images" ON images;
CREATE POLICY "Users can upload images"
    ON images FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Courses policies
DROP POLICY IF EXISTS "Anyone can view published courses" ON courses;
CREATE POLICY "Anyone can view published courses"
    ON courses FOR SELECT USING (is_published = true);

-- Notifications policies
DROP POLICY IF EXISTS "Users can view own notifications" ON notifications;
CREATE POLICY "Users can view own notifications"
    ON notifications FOR SELECT USING (auth.uid() = user_id);

-- ============================================
-- Enable Realtime
-- ============================================
ALTER PUBLICATION supabase_realtime ADD TABLE orders;
ALTER PUBLICATION supabase_realtime ADD TABLE notifications;

-- ============================================
-- Indexes for performance
-- ============================================
CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_images_order ON images(order_id);
CREATE INDEX IF NOT EXISTS idx_images_delete ON images(auto_delete_date);
CREATE INDEX IF NOT EXISTS idx_lens_user ON lens_analysis(user_id);
CREATE INDEX IF NOT EXISTS idx_courses_level ON courses(level);
CREATE INDEX IF NOT EXISTS idx_courses_slug ON courses(slug);
CREATE INDEX IF NOT EXISTS idx_progress_user ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id, is_read);

-- ============================================
-- Auto-delete expired images function
-- ============================================
CREATE OR REPLACE FUNCTION delete_expired_images()
RETURNS void AS $$
BEGIN
    UPDATE images 
    SET is_deleted = true 
    WHERE auto_delete_date < NOW() AND is_deleted = false;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- Insert sample courses
-- ============================================
INSERT INTO courses (title_ar, title_en, slug, description_ar, description_en, level, duration_minutes, is_free, is_published) VALUES
  ('أساسيات التصوير الفوتوغرافي', 'Photography Basics', 'photography-basics', 'تعلم أساسيات الكاميرا، التعريض، والتكوين', 'Learn camera basics, exposure, and composition', 'basic', 240, true, true),
  ('التصوير الاحترافي', 'Professional Photography', 'professional-photography', 'تقنيات متقدمة للتصوير الاحترافي', 'Advanced photography techniques', 'advanced', 360, false, true),
  ('التصميم الجرافيكي', 'Graphic Design', 'graphic-design', 'تعلم Photoshop وIllustrator من الصفر', 'Learn Photoshop and Illustrator from scratch', 'basic', 480, false, true),
  ('تصوير المنتجات', 'Product Photography', 'product-photography', 'تقنيات تصوير المنتجات للتجارة الإلكترونية', 'Product photography techniques for e-commerce', 'advanced', 300, false, true),
  ('تصوير البورتريه', 'Portrait Photography', 'portrait-photography', 'أسرار تصوير الوجوه والتعبيرات', 'Secrets of face and expression photography', 'advanced', 420, false, true),
  ('الذكاء الاصطناعي في التصوير', 'AI in Photography', 'ai-photography', 'استخدام AI لتحسين وتوليد الصور', 'Using AI to enhance and generate images', 'basic', 180, true, true)
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- Insert sample SEO meta
-- ============================================
INSERT INTO seo_meta (page_path, meta_title_ar, meta_title_en, meta_desc_ar, meta_desc_en) VALUES
  ('/', 'Vision Hub - منصة الإبداع البصري', 'Vision Hub - Visual Creativity Platform', 'منصة متكاملة للمصورين والمصممين', 'Integrated platform for photographers and designers'),
  ('/revive', 'Revive - استعادة الصور', 'Revive - Photo Restoration', 'استعد صورك القديمة بجودة عالية', 'Restore your old photos in high quality'),
  ('/frameai', 'FrameAI - توليد التصاميم', 'FrameAI - Design Generation', 'ولد تصاميم فريدة بالذكاء الاصطناعي', 'Generate unique designs with AI'),
  ('/lens-coach', 'Lens Coach - تحليل الصور', 'Lens Coach - Photo Analysis', 'تحليل AI احترافي لصورك', 'Professional AI analysis for your photos'),
  ('/academy', 'AI Academy - التدريب', 'AI Academy - Training', 'تعلم فنون التصوير والتصميم', 'Learn photography and design arts')
ON CONFLICT (page_path) DO NOTHING;
