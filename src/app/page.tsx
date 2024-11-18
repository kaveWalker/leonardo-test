"use client";

import { ChangeEvent, useEffect, useState } from "react";

import {
  Button,
  Fieldset,
  Input,
  Stack,
  AbsoluteCenter,
} from "@chakra-ui/react";
import { redirect } from "next/navigation";

import { Field } from "@/components/ui/field";
import { signup } from "@/lib/signup";

export default function Home() {
  const [usernameInput, setUsernameInput] = useState<string>("");
  const [jobTitleInput, setJobTitleInput] = useState<string>("");

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsernameInput(e.target.value);
  };

  const handleJobTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setJobTitleInput(e.target.value);
  };

  const handleSubmit = () => {
    signup({ username: usernameInput, jobTitle: jobTitleInput });
    redirect("/information");
  };

  return (
    <AbsoluteCenter>
      <Fieldset.Root size="lg" padding="30px" backgroundColor="#fff">
        <Stack>
          <Fieldset.Legend>Sign up</Fieldset.Legend>
          <Fieldset.HelperText>
            Please provide your details below.
          </Fieldset.HelperText>
        </Stack>

        <Fieldset.Content flexDirection="row">
          <Field label="Username">
            <Input name="username" onChange={handleUsernameChange} />
          </Field>

          <Field label="Job title">
            <Input name="job_title" onChange={handleJobTitleChange} />
          </Field>
        </Fieldset.Content>

        <Button type="submit" alignSelf="flex-start" onClick={handleSubmit}>
          Save
        </Button>
      </Fieldset.Root>
    </AbsoluteCenter>
  );
}
