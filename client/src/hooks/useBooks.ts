import { useQuery } from "react-query";
import cookie from "js-cookie";

import api from "../utils/api";
import { BookQuery, BookSingleQuery } from "../utils/types";

const getBooks = async (page: number, query: any) => {
  const token = cookie.get("token");
  console.log(token);
  const { data } = await api.get<BookQuery>("/books", {
    params: {
      page,
      limit: 12,
      ...query,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

const getMyBooks = async () => {
  const token = cookie.get("token");
  const { data } = await api.get<BookQuery>("/users/my-books", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

const getBook = async (slug: string) => {
  const { data } = await api.get<BookSingleQuery>(`/books/${slug}`);
  return data;
};

export const useBooks = (page: number, query?: any) =>
  useQuery(["books", { page, ...query }], () => getBooks(page, query), {
    enabled: !!page,
  });

export const useBook = (slug: string) =>
  useQuery(["books", slug], () => getBook(slug), {
    enabled: !!slug,
  });

export const useMyBooks = () => useQuery(["my-books"], getMyBooks);
