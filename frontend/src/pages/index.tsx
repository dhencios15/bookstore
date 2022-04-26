import type { NextPage } from "next";
import { Box, SimpleGrid } from "@mantine/core";

import { books } from "@utils/db";

import { BookCard } from "@components/BookCard";

const Home: NextPage = () => {
  return (
    <Box>
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
    </Box>
  );
};

export default Home;
