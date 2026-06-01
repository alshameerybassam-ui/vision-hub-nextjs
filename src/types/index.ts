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
