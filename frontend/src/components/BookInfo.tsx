import React from "react";
import { Center, Group, Stack, Text, Title } from "@mantine/core";

import { toPeso, toStocks } from "@utils/formatter";
import { Book } from "@utils/types";

interface Props {
  book: Book;
}

export const BookInfo = ({ book }: Props) => {
  return (
    <Center>
      <Stack align='center'>
        <Title>{book.title}</Title>
        <Text color='dimmed'>{book.author.name}</Text>
        {book.description ? (
          <Text size='lg'>{book.description}</Text>
        ) : (
          <Text size='sm' sx={{ fontStyle: "italic" }}>
            - no description provided -
          </Text>
        )}
        <Group align='center' position='center'>
          <Text align='center'>{toPeso(book.price)}</Text>
          <Text align='center' size='sm' color='blue'>
            {toStocks(book.stock)}
          </Text>
        </Group>
      </Stack>
    </Center>
  );
};
