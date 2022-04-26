import React from "react";
import Link from "next/link";
import { Group, Paper, Text } from "@mantine/core";

import { Book } from "@utils/types";
import { toPeso, toSlug, toStocks } from "@utils/formatter";

interface Props {
  book: Book;
}

export const BookCard = ({ book }: Props) => {
  return (
    <Link href={`/book/${book.slug}`} passHref>
      <Paper
        component='a'
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
        <Text size='xl' align='center' weight='bold'>
          {book.title}
        </Text>
        <Text transform='capitalize' align='center' size='sm' color='dimmed'>
          {book.author.name}
        </Text>
        <Group align='center' position='center'>
          <Text align='center'>{toPeso(book.price)}</Text>
          <Text align='center' size='sm' color='dimmed'>
            {toStocks(book.stock)}
          </Text>
        </Group>
      </Paper>
    </Link>
  );
};
