import { useQuery } from "react-query";
import api from "../utils/api";

const getBooks = async () => {
  const { data } = await api.get("/books");
  return data;
};

const getBook = async (slug: string) => {
  const { data } = await api.get(`/books/${slug}`);
  return data;
};

export const useBooks = () => useQuery(["books"], getBooks);
