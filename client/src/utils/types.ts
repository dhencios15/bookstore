export type Book = {
  id: string;
  title: string;
  author: string;
  description?: string;
  price: number;
  stock: number;
  slug?: string;
};

export type Author = {
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
  success: boolean;
};

export type BookQuery = Paginate & { data: Book[] };

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
