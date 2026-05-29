export interface Profile {
  id: string;
  full_name?: string;
  phone?: string;
  avatar_url?: string;
  role: 'client' | 'admin';
  preferred_lang: 'ar' | 'en' | 'fr';
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  user_id: string;
  service_type: 'revive' | 'frameai' | 'lens_coach' | 'academy';
  status: 'pending' | 'ai_processing' | 'human_review' | 'completed' | 'cancelled';
  price?: number;
  payment_status: 'unpaid' | 'paid' | 'refunded';
  payment_method?: 'stripe' | 'paypal' | 'bank_transfer';
  transaction_id?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  completed_at?: string;
}

export interface Image {
  id: string;
  order_id?: string;
  user_id: string;
  original_url: string;
  ai_processed_url?: string;
  final_url?: string;
  file_size?: number;
  mime_type?: string;
  upload_date: string;
  auto_delete_date: string;
  is_deleted: boolean;
}

export interface ReviveRequest {
  id: string;
  order_id?: string;
  enhancements: Record<string, any>;
  ai_result_url?: string;
  status: 'pending' | 'processing' | 'ai_done' | 'human_done';
  created_at: string;
}

export interface BrandDesign {
  id: string;
  order_id?: string;
  user_id: string;
  questionnaire: Record<string, any>;
  ai_designs: any[];
  selected_designs: any[];
  final_design_url?: string;
  status: 'questionnaire' | 'ai_generating' | 'admin_review' | 'client_selection' | 'finalized';
  created_at: string;
}

export interface LensAnalysis {
  id: string;
  user_id: string;
  image_id?: string;
  ai_score?: number;
  ai_feedback?: Record<string, any>;
  human_analysis?: string;
  video_url?: string;
  status: 'ai_done' | 'requested_human' | 'human_done';
  created_at: string;
}

export interface Course {
  id: string;
  title_ar: string;
  title_en: string;
  slug: string;
  description_ar?: string;
  description_en?: string;
  level: 'basic' | 'advanced';
  thumbnail_url?: string;
  price: number;
  is_free: boolean;
  video_provider: string;
  video_url?: string;
  duration_minutes?: number;
  ai_content?: Record<string, any>;
  is_published: boolean;
  created_at: string;
}

export interface UserProgress {
  id: string;
  user_id: string;
  course_id: string;
  completion_pct: number;
  quiz_scores: any[];
  certificate_url?: string;
  completed_at?: string;
}

export interface Notification {
  id: string;
  user_id: string;
  type: 'email' | 'whatsapp' | 'push';
  title?: string;
  message?: string;
  is_read: boolean;
  sent_at: string;
}

export interface SEOMeta {
  id: string;
  page_path: string;
  meta_title_ar?: string;
  meta_title_en?: string;
  meta_desc_ar?: string;
  meta_desc_en?: string;
  og_image?: string;
  updated_at: string;
}
