import React from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { ActionIcon, Box, Space } from "@mantine/core";
import { ChevronLeft } from "tabler-icons-react";

import { books } from "@utils/db";
import { Book, BookQuery } from "@utils/types";
import { toSlug } from "@utils/formatter";

import { BookInfo } from "@components/BookInfo";
import { BookOthers } from "@components/BookOthers";
import api from "@utils/api";
import { getCookies } from "cookies-next";

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
      <BookOthers author={book.author.name} books={otherBooks} />
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { token } = getCookies({ req: context.req, res: context.res });

  const bookSlug = context.query.book;

  try {
    const response = await api.get<BookQuery>("/books", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const books = await response.data;

    const book = books.data.find((book) => book.slug === bookSlug);

    const otherBooks = books.data.filter(
      (otherBook) =>
        otherBook.slug !== bookSlug &&
        otherBook.author.name === book?.author.name
    );

    return {
      props: { otherBooks, book },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }
};
