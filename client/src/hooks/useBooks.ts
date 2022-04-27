import { useQuery } from "react-query";
import cookie from "js-cookie";

import api from "../utils/api";
import { BookQuery } from "../utils/types";

const getBooks = async (page: number) => {
  const token = cookie.get("token");
  console.log(token);
  const { data } = await api.get<BookQuery>("/books", {
    params: {
      page,
      limit: 12,
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
  const { data } = await api.get(`/books/${slug}`);
  return data;
};

export const useBooks = (page: number) =>
  useQuery(["books", page], () => getBooks(page), {
    enabled: !!page,
  });

export const useMyBooks = () =>
  useQuery(["my-books"], getMyBooks, { staleTime: 0 });
