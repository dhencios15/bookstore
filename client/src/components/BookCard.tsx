import React from "react";
import { ActionIcon, createStyles, Group, Paper, Text } from "@mantine/core";
import { Link } from "react-router-dom";

import { Book } from "../utils/types";
import { toPeso, toSlug, toStocks } from "../utils/formatter";
import { Edit, Trash } from "tabler-icons-react";
import { useHover } from "@mantine/hooks";
import { useModals } from "@mantine/modals";

interface Props {
  book: Book;
  isManipulate?: boolean;
}

const useStyle = createStyles((th) => ({
  container: {
    position: "relative",
    transition: "all .2s ease-in-out",
    ":hover": {
      cursor: "pointer",
      transform: "scale(1.015)",
    },
  },
  link: {
    textDecoration: "none",
    color: "black",
    ":hover": {
      textDecoration: "underline",
    },
  },
  action_container: {
    position: "absolute",
    top: 4,
    right: 8,
  },
}));

export const BookCard = ({ book, isManipulate = false }: Props) => {
  const { classes } = useStyle();
  const { hovered, ref } = useHover();
  const modals = useModals();

  const openUpdateBook = () =>
    modals.openContextModal("createbook", {
      title: "Update Book",
      innerProps: {
        state: "Update",
        book,
      },
    });

  const openDeleteBook = () =>
    modals.openContextModal("deletebook", {
      title: "Delete Book",
      innerProps: {
        state: "Delete",
        book,
      },
    });

  return (
    <Paper
      ref={ref}
      className={classes.container}
      p='md'
      radius='md'
      shadow='sm'
    >
      <Link to={`/book/${book.slug}`} className={classes.link}>
        <Text component='h1' size='xl' align='center' weight='bold'>
          {book.title}
        </Text>
      </Link>
      <Text
        component='p'
        transform='capitalize'
        align='center'
        size='sm'
        color='dimmed'
      >
        {book.author.name}
      </Text>
      <Group align='center' position='center'>
        <Text component='span' align='center'>
          {toPeso(book.price)}
        </Text>
        <Text component='span' align='center' size='sm' color='dimmed'>
          {toStocks(book.stock)}
        </Text>
      </Group>

      {isManipulate && hovered && (
        <Group className={classes.action_container} spacing='xs'>
          <ActionIcon onClick={openUpdateBook}>
            <Edit size={20} color='green' />
          </ActionIcon>
          <ActionIcon onClick={openDeleteBook}>
            <Trash size={20} color='red' />
          </ActionIcon>
        </Group>
      )}
    </Paper>
  );
};
