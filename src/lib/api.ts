import { config } from '@/config/config';

const API_BASE = config.apiUrl;

// Helper function for API requests
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE}${endpoint}`;
  
  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  };

  // Add auth token if available
  const token = localStorage.getItem('authToken');
  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || `API Error: ${response.statusText}`);
  }

  return data;
}

// ==================== AUTHENTICATION ====================

export interface SignupData {
  email: string;
  password: string;
  name: string;
  role: 'tutor' | 'family';
  region?: string;
  specialization?: string[];
  experience?: number;
  qualifications?: string[];
  bio?: string;
  childName?: string;
  childAge?: number;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface UserResponse {
  user: {
    id: string;
    email: string;
    name: string;
    role: 'tutor' | 'family';
    region?: string;
    avatar?: string;
    createdAt: string;
    lastLoginAt?: string;
    [key: string]: any; // For tutor/family specific fields
  };
  message: string;
}

export const authApi = {
  signup: async (data: SignupData): Promise<UserResponse> => {
    return apiRequest<UserResponse>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  login: async (data: LoginData): Promise<UserResponse> => {
    return apiRequest<UserResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

// ==================== USERS ====================

export const userApi = {
  getUser: async (userId: string) => {
    return apiRequest<{ user: any }>(`/users/${userId}`);
  },

  updateUser: async (userId: string, data: any) => {
    return apiRequest<{ user: any; message: string }>(`/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  getAllUsers: async () => {
    return apiRequest<{ users: any[]; count: number }>('/users');
  },
};

// ==================== TUTORS ====================

export const tutorApi = {
  getTutors: async (region?: string) => {
    const params = region && region !== 'all' ? `?region=${region}` : '';
    return apiRequest<{ tutors: any[] }>(`/tutors${params}`);
  },

  getTutor: async (tutorId: string) => {
    return apiRequest<{ tutor: any }>(`/tutors/${tutorId}`);
  },
};

// ==================== ACTIVITIES ====================

export interface ActivityData {
  title: string;
  type: string;
  language: string;
  description?: string;
  elements: any[];
  authorId: string;
  isPublished?: boolean;
  tags?: string[];
}

export const activityApi = {
  getActivities: async (filters?: {
    authorId?: string;
    isPublished?: boolean;
    language?: string;
    type?: string;
  }) => {
    const params = new URLSearchParams();
    if (filters?.authorId) params.append('authorId', filters.authorId);
    if (filters?.isPublished !== undefined) params.append('isPublished', String(filters.isPublished));
    if (filters?.language) params.append('language', filters.language);
    if (filters?.type) params.append('type', filters.type);
    
    const query = params.toString();
    return apiRequest<{ activities: any[] }>(`/activities${query ? `?${query}` : ''}`);
  },

  getActivity: async (activityId: string) => {
    return apiRequest<{ activity: any }>(`/activities/${activityId}`);
  },

  createActivity: async (data: ActivityData) => {
    return apiRequest<{ activity: any; message: string }>('/activities', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateActivity: async (activityId: string, data: Partial<ActivityData>) => {
    return apiRequest<{ activity: any; message: string }>(`/activities/${activityId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  deleteActivity: async (activityId: string) => {
    return apiRequest<{ message: string }>(`/activities/${activityId}`, {
      method: 'DELETE',
    });
  },
};

// ==================== MARKETPLACE ====================

export interface PublishActivityData {
  price: number;
  pricingModel: 'free' | 'paid' | 'institutional';
  ageRange?: { min: number; max: number };
  therapyGoals?: string[];
  diagnosisTags?: string[];
  thumbnail?: string;
  previewUrl?: string;
  description?: string;
}

export const marketplaceApi = {
  getMarketplaceActivities: async (filters?: {
    region?: string;
    language?: string;
    type?: string;
    price?: 'all' | 'free' | 'paid';
    search?: string;
  }) => {
    const params = new URLSearchParams();
    if (filters?.region) params.append('region', filters.region);
    if (filters?.language) params.append('language', filters.language);
    if (filters?.type) params.append('type', filters.type);
    if (filters?.price) params.append('price', filters.price);
    if (filters?.search) params.append('search', filters.search);
    
    const query = params.toString();
    return apiRequest<{ activities: any[] }>(`/marketplace/activities${query ? `?${query}` : ''}`);
  },

  publishActivity: async (activityId: string, data: PublishActivityData) => {
    return apiRequest<{ activity: any; message: string }>(
      `/marketplace/activities/${activityId}/publish`,
      {
        method: 'POST',
        body: JSON.stringify(data),
      }
    );
  },
};

// ==================== PURCHASES ====================

export const purchaseApi = {
  createPurchase: async (userId: string, activityId: string) => {
    return apiRequest<{ purchase: any; message: string }>('/purchases', {
      method: 'POST',
      body: JSON.stringify({ userId, activityId }),
    });
  },

  getUserPurchases: async (userId: string) => {
    return apiRequest<{ purchases: any[]; activities: any[] }>(`/purchases/user/${userId}`);
  },

  checkPurchase: async (userId: string, activityId: string) => {
    return apiRequest<{ purchased: boolean }>(`/purchases/check/${userId}/${activityId}`);
  },
};

// ==================== REVIEWS ====================

export interface ReviewData {
  activityId: string;
  userId: string;
  rating: number;
  comment?: string;
}

export const reviewApi = {
  getActivityReviews: async (activityId: string) => {
    return apiRequest<{ reviews: any[] }>(`/reviews/activity/${activityId}`);
  },

  createReview: async (data: ReviewData) => {
    return apiRequest<{ review: any; message: string }>('/reviews', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

// ==================== HEALTH ====================

export const healthApi = {
  check: async () => {
    return apiRequest<{ status: string; message: string }>('/health');
  },
};

