import type { GetServerSideProps } from "next";
import { getCookies } from "cookies-next";
import { Box, SimpleGrid } from "@mantine/core";

import { BookQuery } from "@utils/types";
import api from "@utils/api";

import { BookCard } from "@components/BookCard";

interface Props {
  booksQuery: BookQuery;
}

const Home = ({ booksQuery }: Props) => {
  return (
    <Box>
      <SimpleGrid
        spacing='lg'
        cols={4}
        breakpoints={[
          { maxWidth: "md", cols: 3, spacing: "md" },
          { maxWidth: "sm", cols: 2, spacing: "sm" },
          { maxWidth: "xs", cols: 1, spacing: "sm" },
        ]}
      >
        {booksQuery.data.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { token } = getCookies({ req: context.req, res: context.res });

  try {
    const response = await api.get("/books", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const books = await response.data;

    return {
      props: { booksQuery: books },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/auth",
        permanent: true,
      },
    };
  }
};

export default Home;
