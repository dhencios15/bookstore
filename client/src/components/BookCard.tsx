import React from "react";
import { Group, Paper, Text } from "@mantine/core";
import { Link } from "react-router-dom";

import { Book } from "../utils/types";
import { toPeso, toSlug, toStocks } from "../utils/formatter";

interface Props {
  book: Book;
}

export const BookCard = ({ book }: Props) => {
  return (
    <Link to={`/book/${toSlug(book.title)}`} style={{ textDecoration: "none" }}>
      <Paper
        sx={(th) => ({
          transition: "all .2s ease-in-out",
          ":hover": {
            cursor: "pointer",
            transform: "scale(1.05)",
          },
        })}
        p='md'
        radius='md'
        shadow='sm'
      >
        <Text component='h1' size='xl' align='center' weight='bold'>
          {book.title}
        </Text>
        <Text
          component='p'
          transform='capitalize'
          align='center'
          size='sm'
          color='dimmed'
        >
          {book.author}
        </Text>
        <Group align='center' position='center'>
          <Text component='span' align='center'>
            {toPeso(book.price)}
          </Text>
          <Text component='span' align='center' size='sm' color='dimmed'>
            {toStocks(book.stock)}
          </Text>
        </Group>
      </Paper>
    </Link>
  );
};
