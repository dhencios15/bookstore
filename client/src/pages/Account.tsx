import {
  Avatar,
  Button,
  Group,
  Paper,
  SimpleGrid,
  Space,
  Stack,
  Text,
} from "@mantine/core";
import { Plus } from "tabler-icons-react";

import { useUser } from "../hooks/store/useUser";
import { getYearDate } from "../utils/formatter";
import { useMyBooks } from "../hooks/useBooks";

import { BookCard } from "../components/BookCard";
import { Layout } from "../components/Layout";
import { CardSkeleton } from "../components/CardSkeleton";

export const Account = () => {
  const user = useUser((state) => state.user);
  const myBooksQuery = useMyBooks();

  return (
    <Layout>
      <Paper
        mb='xl'
        p='xl'
        radius='md'
        shadow='sm'
        sx={{ width: "max-content" }}
      >
        <Group>
          <Avatar size='xl' src={`https://robohash.org/${user?.name}`} />
          <Stack spacing='xs'>
            <Text weight='bold' transform='capitalize'>
              {user?.name}
            </Text>
            <Text>{user?.email}</Text>
            <Text size='sm' color='dimmed'>
              member since {getYearDate(`${user?.createdAt}`)}
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
      {myBooksQuery.isLoading ? (
        <CardSkeleton numOfCards={4} />
      ) : (
        <>
          <SimpleGrid
            spacing='lg'
            cols={4}
            breakpoints={[
              { maxWidth: "md", cols: 3, spacing: "md" },
              { maxWidth: "sm", cols: 2, spacing: "sm" },
              { maxWidth: "xs", cols: 1, spacing: "sm" },
            ]}
          >
            {myBooksQuery.data?.data.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </SimpleGrid>
        </>
      )}
    </Layout>
  );
};
