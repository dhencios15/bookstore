import { ActionIcon, Box, Skeleton, Space } from "@mantine/core";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft } from "tabler-icons-react";
import { BookInfo } from "../components/BookInfo";
import { BookOthers } from "../components/BookOthers";
import { Layout } from "../components/Layout";
import { useBook, useBooks } from "../hooks/useBooks";

import { books } from "../utils/db";

export const BookInformation = () => {
  const params = useParams();
  const navigate = useNavigate();
  const bookQuery = useBook(params.bookSlug || "");
  const booksQuery = useBooks(1, { author: bookQuery.data?.data.author._id });

  const book = bookQuery.data?.data;

  const otherBooks = booksQuery.data?.data.filter(
    (otherBook) =>
      otherBook._id !== book?._id && otherBook.author._id === book?.author._id
  );

  return (
    <Layout>
      <ActionIcon onClick={() => navigate(-1)}>
        <ChevronLeft />
      </ActionIcon>
      <Space h='xl' />
      {bookQuery.isLoading ? (
        <BookSkeleton />
      ) : (
        book && <BookInfo book={book} />
      )}
      <Space h='xl' />
      {book && otherBooks && (
        <BookOthers author={book.author.name} books={otherBooks} />
      )}
    </Layout>
  );
};

const BookSkeleton = () => {
  return (
    <Skeleton visible={true}>
      <Box sx={{ width: 250, height: 140 }} />
    </Skeleton>
  );
};
