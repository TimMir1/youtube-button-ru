export interface Product {
  id: string;
  name: string;
  description: string;
  weight: string;
  price?: string;
  imageUrl: string;
  avitoUrl: string;
  category: 'youtube' | 'shorts' | 'other';
}

export type View = 'catalog' | 'cart' | 'profile';
