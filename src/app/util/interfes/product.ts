
export interface IProduct {
  _id: number;
  title: string;
  slug: string;
  description: string;
  price: number;
  quantity: number;
  ratingsAverage: number;
  ratingsQuantity: number;
  imageCover: string;
  images: string[];
  category: Category;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Category {
  name: string;
  slug: string;
  image: string;
}
