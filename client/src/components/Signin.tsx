import React from "react";
import {
  Button,
  Center,
  Paper,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import cookie from "js-cookie";

import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query";
import { useUser } from "../hooks/store/useUser";

const schema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z.string(),
});

export type SigninFormType = z.infer<typeof schema>;

interface Props {
  from: string;
}

export const Signin = ({ from }: Props) => {
  const navigate = useNavigate();
  const setUser = useUser((state) => state.setUser);
  const form = useForm<SigninFormType>({
    schema: zodResolver(schema),
    initialValues: {
      email: "",
      password: "",
    },
  });

  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const onSignup = async (data: SigninFormType) => {
    const { email, password } = data;
    setIsLoading(true);
    try {
      const response = await api.post("users/login", {
        email,
        password,
      });

      const user = await response.data;
      setUser(user.data.user);
      cookie.set("token", user.token);
      api.defaults.headers.common = {
        Authorization: `Bearer ${user.token}`,
      };
      navigate(from, { replace: true });
    } catch (error: any) {
      console.log(error.response);
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Paper
      onSubmit={form.onSubmit(onSignup)}
      component='form'
      withBorder
      shadow='md'
      p={30}
      mt={30}
      radius='md'
    >
      <Center>
        {error && (
          <Text sx={{ display: "inline" }} color='red' size='sm'>
            {error}
          </Text>
        )}
      </Center>
      <TextInput
        {...form.getInputProps("email")}
        type='email'
        label='Email'
        mt='sm'
        placeholder='e.g eda@man.com'
        required
      />
      <PasswordInput
        {...form.getInputProps("password")}
        label='Password'
        placeholder='Your password'
        required
        mt='sm'
        id='password'
      />
      <Button loading={isLoading} type='submit' color='green' fullWidth mt='xl'>
        {isLoading ? "Signing in..." : "Sign in"}
      </Button>
    </Paper>
  );
};
