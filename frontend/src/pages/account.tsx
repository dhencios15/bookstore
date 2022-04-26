import { BookCard } from "@components/BookCard";
import {
  Avatar,
  Box,
  Button,
  Group,
  Paper,
  SimpleGrid,
  Space,
  Stack,
  Text,
} from "@mantine/core";
import { books } from "@utils/db";
import React from "react";
import { Plus } from "tabler-icons-react";

export default function AccountPage() {
  return (
    <Box>
      <Paper
        mb='xl'
        p='xl'
        radius='md'
        shadow='sm'
        sx={{ width: "max-content" }}
      >
        <Group>
          <Avatar size='xl' src='https://robohash.org/dhencio' />
          <Stack spacing='xs'>
            <Text weight='bold'>Dhencio</Text>
            <Text>denysdon15@gmail.com</Text>
            <Text size='sm' color='dimmed'>
              member since 2010
            </Text>
          </Stack>
        </Group>
      </Paper>
      <Space h='xl' />
      <Group position='apart'>
        <Text weight='bold' size='lg'>
          MY BOOKS
        </Text>
        <Button leftIcon={<Plus size={16} />} size='xs'>
          CREATE BOOK
        </Button>
      </Group>
      <Space h='xl' />
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
}
