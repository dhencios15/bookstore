import React from "react";
import { GetServerSideProps } from "next";
import { getCookies } from "cookies-next";
import { Anchor, Text, Container } from "@mantine/core";

import api from "@utils/api";

import { Signin } from "@components/Signin";
import { Signup } from "@components/Signup";

export default function AuthPage() {
  const [authType, setAuthType] = React.useState<"signin" | "signup">("signin");

  const isSignin = authType === "signin";

  return (
    <Container size={420} my={40}>
      <Text
        align='center'
        inherit
        variant='gradient'
        gradient={{ from: "blue", to: "cyan" }}
        sx={() => ({
          fontWeight: 900,
          fontSize: 40,
        })}
      >
        Welcome back!
      </Text>
      <Text color='dimmed' size='sm' align='center' mt={5}>
        {isSignin ? "Do not have an account yet?" : "Already have an account?"}{" "}
        <Anchor<"a">
          size='sm'
          onClick={() =>
            setAuthType((prev) => (prev === "signin" ? "signup" : "signin"))
          }
        >
          {isSignin ? "Create account" : "Sign in"}
        </Anchor>
      </Text>

      {isSignin ? <Signin /> : <Signup />}
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { token } = getCookies({ req: context.req, res: context.res });

  try {
    await api.get("/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
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
