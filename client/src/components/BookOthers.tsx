import React from "react";
import { Box, SimpleGrid, Space, Text } from "@mantine/core";

import { Book } from "../utils/types";

import { BookCard } from "./BookCard";

interface Props {
  author: string;
  books: Book[];
}

export const BookOthers = ({ author, books }: Props) => {
  return (
    <Box mt='xl'>
      <Text weight='bold' size='lg'>
        YOU MIGHT ALSO LIKE OTHER ({author.toUpperCase()}) WORKS
      </Text>
      <Space h='xl' />
      <SimpleGrid spacing='lg' cols={4}>
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </SimpleGrid>
    </Box>
  );
};
