export interface Author {
  id: string;
  name: string;
}
export interface Category {
  id: string;
  name: string;
}
export interface Book {
  id: string;
  title: string;
  stock_quantity: number;
  price: string;
  author: string;
  category: string;
  publisher: string;
}
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface Publisher {
  id: string;
  name: string;
  contact: string;
}
