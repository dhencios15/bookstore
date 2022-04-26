import React from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { ActionIcon, Box, Space } from "@mantine/core";
import { ChevronLeft } from "tabler-icons-react";

import { books } from "@utils/db";
import { Book } from "@utils/types";
import { toSlug } from "@utils/formatter";

import { BookInfo } from "@components/BookInfo";
import { BookOthers } from "@components/BookOthers";

interface Props {
  book: Book;
  otherBooks: Book[];
}

export default function BookPage({ book, otherBooks }: Props) {
  const router = useRouter();
  return (
    <Box>
      <ActionIcon onClick={() => router.back()}>
        <ChevronLeft />
      </ActionIcon>
      <Space h='xl' />
      <BookInfo book={book} />
      <Space h='xl' />
      <BookOthers author={book.author} books={otherBooks} />
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const bookSlug = context.query.book;

  const book = (await books.find(
    (book) => toSlug(book.title) === String(bookSlug)
  )) as Book;

  const otherBooksWithSameAuthor = books.filter(
    (otherBook) => otherBook.id !== book.id && otherBook.author === book.author
  );

  if (!book) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { book, otherBooks: otherBooksWithSameAuthor },
  };
};
