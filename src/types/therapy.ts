export type UserRole = 'tutor' | 'family';

export type ActivityType = 
  | 'matching'
  | 'visual-schedule'
  | 'aac-board'
  | 'sequencing'
  | 'social-story'
  | 'yes-no-cards'
  | 'phonics';

export type Language = 
  | 'english'
  | 'hindi'
  | 'tamil'
  | 'telugu'
  | 'kannada'
  | 'malayalam'
  | 'bengali'
  | 'marathi'
  | 'gujarati'
  | 'punjabi';

export type IndianRegion = 
  | 'north'
  | 'south'
  | 'east'
  | 'west'
  | 'central'
  | 'northeast'
  | 'all';

export type PricingModel = 'free' | 'paid' | 'institutional';

export type AssetCategory = 
  | 'food'
  | 'clothing'
  | 'places'
  | 'routines'
  | 'emotions'
  | 'transport'
  | 'family'
  | 'nature'
  | 'objects';

export interface Asset {
  id: string;
  name: string;
  nameHindi?: string;
  category: AssetCategory;
  imageUrl: string;
  tags: string[];
}

export interface CanvasElement {
  id: string;
  type: 'image' | 'text' | 'shape' | 'audio';
  x: number;
  y: number;
  width: number;
  height: number;
  content: string;
  style?: {
    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: number;
    borderRadius?: number;
    fontSize?: number;
    fontColor?: string;
  };
  isDropZone?: boolean;
  correctAnswer?: string;
}

export interface Activity {
  id: string;
  title: string;
  type: ActivityType;
  language: Language;
  description: string;
  elements: CanvasElement[];
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  isPublished: boolean;
  tags: string[];
}

export interface Template {
  id: string;
  name: string;
  type: ActivityType;
  description: string;
  thumbnail: string;
  elements: CanvasElement[];
}

export interface DragItem {
  id: string;
  type: string;
  content: string;
  imageUrl?: string;
}

// User & Authentication Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  region?: IndianRegion;
  avatar?: string;
  createdAt: Date;
  lastLoginAt?: Date;
}

export interface Tutor extends User {
  role: 'tutor';
  region: IndianRegion;
  specialization?: string[];
  experience?: number; // years
  qualifications?: string[];
  bio?: string;
  rating?: number;
  totalStudents?: number;
  totalActivities?: number;
  verified?: boolean;
}

export interface FamilyUser extends User {
  role: 'family';
  childName?: string;
  childAge?: number;
  selectedTutorId?: string;
  favoriteActivities?: string[];
}

// Marketplace Types
export interface MarketplaceActivity extends Activity {
  author: {
    id: string;
    name: string;
    region: IndianRegion;
    avatar?: string;
    rating?: number;
  };
  price: number;
  pricingModel: PricingModel;
  purchaseCount: number;
  rating: number;
  reviewCount: number;
  thumbnail?: string;
  previewUrl?: string;
  ageRange?: {
    min: number;
    max: number;
  };
  therapyGoals?: string[];
  diagnosisTags?: string[];
}

export interface Review {
  id: string;
  activityId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface Purchase {
  id: string;
  userId: string;
  activityId: string;
  purchasedAt: Date;
  price: number;
}
