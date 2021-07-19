import React from "react";
import { Button } from "../components/core/Button";
import { FormCard } from "../components/core/FormCard";
import { FullViewWrapper } from "../components/core/FullViewWrapper";
import InputLabel from "../components/core/InputLabel";
import { Typography } from "../components/core/Typography";
import Link from "next/link";
import { useMutationHook } from "../hooks/useMutationHook";
import { useFormHook } from "../hooks/useFormHook";

const Login = () => {
  const { LoginUser } = useMutationHook();

  const { state, getProps } = useFormHook({
    email: "",
    password: "",
  });

  return (
    <FullViewWrapper>
      <FormCard width="500" as="div">
        <Typography margin="0 0 20px 0" colorized align="center" variant="h2">
          Login
        </Typography>
        <InputLabel
          {...getProps("email")}
          margin="0 0 10px 0"
          placeholder="Email"
        />
        <InputLabel
          {...getProps("password")}
          margin="0 0 10px 0"
          placeholder="Password"
        />

        <Button grow onClick={() => LoginUser(state.email, state.password)}>
          Login
        </Button>
        <Typography margin="10px 0 0 0" align="center" variant="subtitle">
          dont have an <Link href="/signup">account?</Link>
        </Typography>
      </FormCard>
    </FullViewWrapper>
  );
};

export default Login;
