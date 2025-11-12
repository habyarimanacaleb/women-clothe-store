export interface Review {
  user: string;
  comment: string;
  rating: number;
}

export interface Product {
  id: string;
  image: string;
  price: string;
  label: string;
  stock: number;
  description: string;
  category: string;
  reviews: Review[];
}
