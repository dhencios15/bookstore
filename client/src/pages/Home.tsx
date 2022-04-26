import { Box, SimpleGrid } from "@mantine/core";
import React from "react";
import { BookCard } from "../components/BookCard";
import { Layout } from "../components/Layout";

import { books } from "../utils/db";

export const Home = () => {
  return (
    <Layout>
      <SimpleGrid
        spacing='lg'
        cols={4}
        breakpoints={[
          { maxWidth: "md", cols: 3, spacing: "md" },
          { maxWidth: "sm", cols: 2, spacing: "sm" },
          { maxWidth: "xs", cols: 1, spacing: "sm" },
        ]}
      >
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </SimpleGrid>
    </Layout>
  );
};
