import { useMutation, useQueryClient } from "react-query";
import api from "../../utils/api";

interface IFormBook {
  title: string;
  description?: string;
  price: number;
  stock: number;
}

const createBook = async (book: IFormBook) => await api.post("/books", book);
const updateBook = async (book: IFormBook, slug: string) =>
  await api.put(`/books/${slug}`, book);
const deleteBook = async (slug: string) => await api.delete(`/books/${slug}`);

export const useCreateBook = () => {
  const queryClient = useQueryClient();
  return useMutation((data: IFormBook) => createBook(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(["my-books"]);
      queryClient.invalidateQueries(["books"]);
    },
  });
};

export const useUpdateBook = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ data, slug }: { data: IFormBook; slug: string }) =>
      updateBook(data, slug),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["my-books"]);
        queryClient.invalidateQueries(["books"]);
      },
    }
  );
};

export const useDeleteBook = () => {
  const queryClient = useQueryClient();
  return useMutation((slug: string) => deleteBook(slug), {
    onSuccess: () => {
      queryClient.invalidateQueries(["my-books"]);
      queryClient.invalidateQueries(["books"]);
    },
  });
};
