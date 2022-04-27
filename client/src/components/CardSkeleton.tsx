import { Box, SimpleGrid, Skeleton } from "@mantine/core";
import React from "react";

interface Props {
  numOfCards?: number;
}

export const CardSkeleton = ({ numOfCards = 8 }: Props) => {
  return (
    <SimpleGrid
      spacing='lg'
      cols={4}
      breakpoints={[
        { maxWidth: "md", cols: 3, spacing: "md" },
        { maxWidth: "sm", cols: 2, spacing: "sm" },
        { maxWidth: "xs", cols: 1, spacing: "sm" },
      ]}
    >
      {new Array(numOfCards).fill(1).map((_, idx) => (
        <Skeleton key={idx} visible={true}>
          <Box sx={{ width: 320, height: 150 }} />
        </Skeleton>
      ))}
    </SimpleGrid>
  );
};
