import { Box, Container } from "@mantine/core";
import * as React from "react";
import { MainNavbar } from "./MainNavbar";

interface Props {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <Box
      sx={(th) => ({
        backgroundColor: th.colors["deep-white"][1],
        minHeight: "100vh",
      })}
    >
      <MainNavbar />
      <Container py='lg' size={1400}>
        {children}
      </Container>
    </Box>
  );
};
