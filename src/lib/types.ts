export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  metrics: {
    performance: string;
    speed: string;
    users?: string;
  };
  link?: string;
  image?: string;
}

export interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  features?: string[];
}

export interface ContactMessage {
  name: string;
  email: string;
  company?: string;
  message: string;
  phone?: string;
  subject: 'project' | 'support' | 'partnership' | 'other';
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
}

export interface Analytics {
  activeVisitors: number;
  pageViews: number;
  bounceRate: number;
  avgSessionDuration: number;
}

export interface ApiResponse<T> {
  status: 'success' | 'error';
  data?: T;
  message?: string;
}