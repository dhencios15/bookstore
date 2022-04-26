import { ActionIcon, Space } from "@mantine/core";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft } from "tabler-icons-react";
import { BookInfo } from "../components/BookInfo";
import { BookOthers } from "../components/BookOthers";
import { Layout } from "../components/Layout";

import { books } from "../utils/db";

export const BookInformation = () => {
  const params = useParams();
  const navigate = useNavigate();
  const book = books[0];
  console.log(params.bookSlug);
  const otherBooks = books.filter(
    (otherBook) => otherBook.id !== book.id && otherBook.author === book.author
  );

  return (
    <Layout>
      <ActionIcon onClick={() => navigate("/")}>
        <ChevronLeft />
      </ActionIcon>
      <Space h='xl' />
      <BookInfo book={book} />
      <Space h='xl' />
      <BookOthers author={book.author} books={otherBooks} />
    </Layout>
  );
};
