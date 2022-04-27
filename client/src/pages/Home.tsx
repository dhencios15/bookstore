import { Center, Pagination, SimpleGrid } from "@mantine/core";

import { useBooks } from "../hooks/useBooks";

import { BookCard } from "../components/BookCard";
import { CardSkeleton } from "../components/CardSkeleton";
import { Layout } from "../components/Layout";
import React from "react";

export const Home = () => {
  const [activePage, setPage] = React.useState(1);

  const booksQuery = useBooks(activePage);
  console.log(activePage);
  return (
    <Layout>
      {booksQuery.isLoading ? (
        <CardSkeleton />
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
            {booksQuery.data?.data.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </SimpleGrid>
          <Center mt='xl'>
            <Pagination
              onChange={setPage}
              page={booksQuery.data?.page}
              total={booksQuery.data?.totalPages || 1}
            />
          </Center>
        </>
      )}
    </Layout>
  );
};
