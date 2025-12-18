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
