import {
  Button,
  Center,
  NumberInput,
  Paper,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { ContextModalProps, useModals } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import React from "react";
import { z } from "zod";

import {
  useCreateBook,
  useUpdateBook,
} from "../../hooks/mutate/useBookMuatate";
import { Book } from "../../utils/types";

const schema = z.object({
  title: z.string(),
  description: z.string().optional(),
  price: z.number().positive(),
  stock: z.number().positive(),
});

export type CreateFormType = z.infer<typeof schema>;

type Props = {
  state: "Update" | "Create";
  book: Book;
};

export const BookFormModal = ({ innerProps }: ContextModalProps<Props>) => {
  const { book, state } = innerProps;
  const modals = useModals();
  const createBook = useCreateBook();
  const updateBook = useUpdateBook();
  const [error, setError] = React.useState(null);
  const form = useForm<CreateFormType>({
    schema: zodResolver(schema),
    initialValues: {
      title: book?.title || "",
      description: book?.description || "",
      price: book?.price || 1,
      stock: book?.stock || 1,
    },
  });

  async function onCreateBook(data: CreateFormType) {
    try {
      createBook.mutateAsync(data);
      form.reset();
      showNotification({
        title: "Create Success",
        message: `${data.title.toUpperCase()} has been added to the book list`,
        color: "green",
      });
    } catch (error: any) {
      setError(error.response.data.message);
    }
  }

  async function onUpdateBook(data: CreateFormType) {
    try {
      updateBook.mutateAsync({ data, slug: book.slug });
      form.reset();
      showNotification({
        title: "Update Success",
        message: `${data.title.toUpperCase()} has been updated`,
        color: "green",
      });
      modals.closeAll();
    } catch (error: any) {
      setError(error.response.data.message);
    }
  }

  const onSubmitForm = async (data: CreateFormType) => {
    state === "Create" ? onCreateBook(data) : onUpdateBook(data);
  };

  const isLoading = createBook.isLoading || updateBook.isLoading;
  const isError = createBook.isError || updateBook.isError;

  return (
    <Paper
      onSubmit={form.onSubmit(onSubmitForm)}
      component='form'
      p={30}
      pt={6}
      radius='md'
    >
      <Center>
        {error && isError && (
          <Text sx={{ display: "inline" }} color='red' size='sm'>
            {error}
          </Text>
        )}
      </Center>
      <TextInput
        {...form.getInputProps("title")}
        label='Title'
        mt='xs'
        required
      />
      <TextInput
        {...form.getInputProps("description")}
        label='Description'
        mt='xs'
      />
      <NumberInput
        {...form.getInputProps("price")}
        defaultValue={1}
        label='Price'
        mt='xs'
        required
      />
      <NumberInput
        {...form.getInputProps("stock")}
        defaultValue={1}
        label='Stock'
        mt='xs'
        required
      />
      <Button loading={isLoading} type='submit' color='green' fullWidth mt='xl'>
        {isLoading ? "Submitting..." : `${state} Book`}
      </Button>
    </Paper>
  );
};
