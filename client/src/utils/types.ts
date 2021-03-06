export type Book = {
  _id: string;
  title: string;
  author: Author;
  description?: string;
  price: number;
  stock: number;
  slug: string;
};

export type Author = {
  _id: string;
  name: string;
  email: string;
};

export type Paginate = {
  total_items: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage?: number | null;
  nextPage?: number | null;
  success: string;
};

export type BookQuery = Paginate & { data: Book[] };
export type BookSingleQuery = {
  success: string;
  data: Book;
};
export type User = {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};
// "total_items": 2,
// "limit": 10,
// "totalPages": 1,
// "page": 1,
// "pagingCounter": 1,
// "hasPrevPage": false,
// "hasNextPage": false,
// "prevPage": null,
// "nextPage": null
// "success": true,
