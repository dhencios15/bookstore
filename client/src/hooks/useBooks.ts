import { useQuery } from "react-query";
import api from "../utils/api";
import { BookQuery } from "../utils/types";

const getBooks = async (page: number) => {
  const { data } = await api.get<BookQuery>("/books", {
    params: {
      page,
      limit: 12,
    },
  });
  return data;
};

const getMyBooks = async () => {
  const { data } = await api.get<BookQuery>("/users/my-books");
  return data;
};

const getBook = async (slug: string) => {
  const { data } = await api.get(`/books/${slug}`);
  return data;
};

export const useBooks = (page: number) =>
  useQuery(["books", page], () => getBooks(page), {
    enabled: !!page,
  });

export const useMyBooks = () => useQuery(["my-books"], getMyBooks);
