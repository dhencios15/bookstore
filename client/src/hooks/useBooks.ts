import { useQuery } from "react-query";
import api from "../utils/api";
import { BookQuery } from "../utils/types";

const getBooks = async () => {
  const { data } = await api.get<BookQuery>("/books");
  return data;
};

const getNyBooks = async () => {
  const { data } = await api.get<BookQuery>("/users/my-books");
  return data;
};

const getBook = async (slug: string) => {
  const { data } = await api.get(`/books/${slug}`);
  return data;
};

export const useBooks = () => useQuery(["books"], getBooks);
export const useMyBooks = () => useQuery(["my-books"], getNyBooks);
