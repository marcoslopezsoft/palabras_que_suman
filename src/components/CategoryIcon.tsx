'use client';

import React from 'react';
import { 
  ShieldCheck, 
  GraduationCap, 
  Crown, 
  Palette, 
  Heart, 
  Users, 
  Sparkles,
  LucideProps 
} from 'lucide-react';
import { Category, CategoryIconType } from '@/types';

interface CategoryIconProps extends LucideProps {
  category?: Category;
  iconType?: CategoryIconType;
}

export default function CategoryIcon({
  category,
  iconType,
  className = 'w-4 h-4',
  ...props
}: CategoryIconProps) {
  const type = iconType || (category ? getIconTypeFromCategory(category) : 'shield');

  switch (type) {
    case 'shield':
      return <ShieldCheck className={className} {...props} />;
    case 'graduation':
      return <GraduationCap className={className} {...props} />;
    case 'crown':
      return <Crown className={className} {...props} />;
    case 'palette':
      return <Palette className={className} {...props} />;
    case 'heart':
      return <Heart className={className} {...props} />;
    case 'users':
      return <Users className={className} {...props} />;
    default:
      return <Sparkles className={className} {...props} />;
  }
}

function getIconTypeFromCategory(cat: Category): CategoryIconType {
  switch (cat) {
    case 'valentia':
      return 'shield';
    case 'educacion':
      return 'graduation';
    case 'liderazgo':
      return 'crown';
    case 'creatividad':
      return 'palette';
    case 'autoestima':
      return 'heart';
    case 'sororidad':
      return 'users';
    default:
      return 'shield';
  }
}
