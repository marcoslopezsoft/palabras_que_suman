export type Category = 
  | 'valentia' 
  | 'educacion' 
  | 'liderazgo' 
  | 'creatividad' 
  | 'autoestima' 
  | 'sororidad';

export type CategoryIconType = 
  | 'shield' 
  | 'graduation' 
  | 'crown' 
  | 'palette' 
  | 'heart' 
  | 'users';

export type ColorTheme = 
  | 'rose' 
  | 'lavender' 
  | 'mint' 
  | 'amber' 
  | 'lilac' 
  | 'sky';

export interface CategoryInfo {
  id: Category;
  label: string;
  icon: CategoryIconType;
  colorClass: string;
  bgLight: string;
  borderClass: string;
  gradient: string;
  description: string;
}

export interface CommunityMessage {
  id: string;
  name: string;
  role: string;
  city: string;
  message: string;
  category: Category;
  theme: ColorTheme;
  likes: number;
  createdAt: string;
  isFavorite?: boolean;
  editionCode?: string;
}

export interface CollectibleBookmark {
  id: string;
  quote: string;
  author: string;
  authorRole: string;
  authorCity?: string;
  category: Category;
  theme: ColorTheme;
  illustration: 'star' | 'sun' | 'flower' | 'sparkle' | 'heart' | 'book' | 'mountain' | 'butterfly';
  dedication: string;
  edition: string;
}

export interface FilterState {
  search: string;
  category: Category | 'all';
  city: string;
  sortBy: 'recent' | 'popular';
}
