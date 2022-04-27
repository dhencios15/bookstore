import { Button, Center, Group, Paper, Text } from "@mantine/core";
import { ContextModalProps } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import React from "react";
import { Trash } from "tabler-icons-react";
import { z } from "zod";

import { useDeleteBook } from "../../hooks/mutate/useBookMuatate";
import { Book } from "../../utils/types";

const schema = z.object({
  title: z.string(),
  description: z.string().optional(),
  price: z.number().positive(),
  stock: z.number().positive(),
});

export type CreateFormType = z.infer<typeof schema>;

type Props = {
  state: "Delete";
  book: Book;
};

export const BookDeleteModal = ({
  context,
  id,
  innerProps,
}: ContextModalProps<Props>) => {
  const { book, state } = innerProps;
  const deleteBook = useDeleteBook();
  const [error, setError] = React.useState(null);

  const onDeleteBook = async () => {
    try {
      deleteBook.mutateAsync(book.slug);
      showNotification({
        title: "Create Success",
        message: `${book.title.toUpperCase()} has been deleted to the book list`,
        color: "green",
      });
      context.closeModal(id);
    } catch (error: any) {
      setError(error.response.data.message);
    }
  };

  const isLoading = deleteBook.isLoading;
  const isError = deleteBook.isError;

  return (
    <Paper py={6} radius='md'>
      <Center>
        {error && isError && (
          <Text sx={{ display: "inline" }} color='red' size='sm'>
            {error}
          </Text>
        )}
      </Center>
      <Group position='center'>
        <Button
          onClick={() => context.closeModal(id)}
          loading={isLoading}
          type='submit'
          color='red'
          variant='outline'
        >
          Cancel
        </Button>
        <Button
          onClick={onDeleteBook}
          loading={isLoading}
          type='submit'
          color='red'
          leftIcon={<Trash />}
        >
          {isLoading ? "Deleting..." : `${state} Book`}
        </Button>
      </Group>
    </Paper>
  );
};
