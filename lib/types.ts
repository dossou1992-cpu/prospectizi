export type ProspectStatus = 'nouveau' | 'non_contacte' | 'en_discussion' | 'gagne' | 'perdu';

export type Channel = 'google_maps' | 'linkedin' | 'facebook' | 'instagram' | 'google';

export type PlanType = 'DECOUVERTE' | 'PRO' | 'AGENCE';

export type UserRole = 'user' | 'superadmin';

export interface ProspectSocialLinks {
  facebook?: string;
  linkedin?: string;
  instagram?: string;
  google_maps?: string;
  google?: string;
}

export interface ProspectMessages {
  first_contact: string;
  first_contact_variant_b?: string;
  value_offer: string;
  followup_1: string;
  followup_2: string;
  followup_final: string;
}

export interface Prospect {
  id: string;
  user_id?: string;
  company_name: string;
  activity: string;
  city: string;
  country: string;
  qualification_score: number; // 60 - 100
  qualification_reason: string;
  flaws_identified: string;
  recommended_offer: string;
  opportunity: string;
  channel: Channel;
  collected_at: string;
  email: string;
  phone: string;
  website_url?: string;
  social_links: ProspectSocialLinks;
  status: ProspectStatus;
  generated_messages: ProspectMessages;
  private_notes?: string;
  closing_tips?: string[];
  is_existing?: boolean;
  is_closed?: boolean;
  last_contact_date?: string;
  last_followup_done_date?: string;
  sent_variant?: 'A' | 'B';
  estimated_deal_value?: number;
}

export interface AvatarProfile {
  full_name: string;
  email: string;
  profession: string;
  company_name: string;
  offer: string;
  target_audience: string;
  major_benefit: string;
  tone: 'professionnel' | 'chaleureux' | 'direct' | 'persuasif';
  followup_frequency: 'J+3' | 'J+5' | 'J+10';
  auto_reminders: boolean;
}

export interface UserSettings {
  notify_days_before: number; // e.g. 5 days before expiry
  notify_channel: 'email' | 'whatsapp' | 'both';
  email_notifications: boolean;
  whatsapp_notifications: boolean;
  phone_number: string;
}

export interface Subscription {
  plan_type: PlanType;
  status: 'active' | 'canceled' | 'expired' | 'exhausted';
  prospects_quota: number;
  prospects_used: number;
  bonus_prospects: number;
  current_period_end: string;
  auto_renew: boolean;
}

export interface AuditReport {
  generated_at: string;
  next_audit_available_at: string;
  stats: {
    total_contacted: number;
    response_rate: number;
    closing_rate: number;
  };
  main_bottleneck: string;
  key_findings: string[];
  recommended_script: {
    first_contact_optimized: string;
    followup_optimized: string;
  };
  avatar_suggestions?: string;
  ab_test_active?: boolean;
  ab_test_stats?: {
    variant_a_sent: number;
    variant_b_sent: number;
    variant_a_replies: number;
    variant_b_replies: number;
  };
}

export interface Testimonial {
  id: string;
  user_email: string;
  user_name: string;
  loom_url: string;
  commercial_consent: boolean;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}

export interface TeamMember {
  id: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  status: 'invited' | 'active' | 'revoked';
  created_at: string;
}
