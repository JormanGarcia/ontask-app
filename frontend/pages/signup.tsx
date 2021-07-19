import React, { useState } from "react";
import { Button } from "../components/core/Button";
import { FormCard } from "../components/core/FormCard";
import { FullViewWrapper } from "../components/core/FullViewWrapper";
import InputLabel from "../components/core/InputLabel";
import { Typography } from "../components/core/Typography";
import Link from "next/link";
import styled from "styled-components";
import { useMutation } from "@apollo/client";
import { SIGNUP } from "../api/mutation";
import { useFormHook } from "../hooks/useFormHook";
import { useMutationHook } from "../hooks/useMutationHook";

const Signup = () => {
  const { SignupUser } = useMutationHook();
  const { state, getProps } = useFormHook({
    email: "",
    password: "",
    first: "",
    last: "",
  });

  return (
    <FullViewWrapper>
      <FormCard width="500" as="div">
        <Typography margin="0 0 20px 0" colorized align="center" variant="h2">
          Signup
        </Typography>
        <InputLabel
          margin="0 0 10px 0"
          placeholder="Email"
          {...getProps("email")}
        />
        <InputLabel
          margin="0 0 10px 0"
          placeholder="Password"
          {...getProps("password")}
        />
        <FlexDiv>
          <InputLabel
            margin="0 5px 10px 0"
            placeholder="First Name"
            {...getProps("first")}
          />
          <InputLabel
            margin="0 0 10px 0"
            placeholder="Last Name"
            {...getProps("last")}
          />
        </FlexDiv>
        <Button
          grow
          onClick={() =>
            SignupUser(state.email, state.password, state.first, state.last)
          }
        >
          Signup
        </Button>
        <Typography margin="10px 0 0 0" align="center" variant="subtitle">
          Already have an <Link href="/login">account?</Link>
        </Typography>
      </FormCard>
    </FullViewWrapper>
  );
};

const FlexDiv = styled.div`
  display: flex;
`;

export default Signup;
