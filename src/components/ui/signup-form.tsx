import { ChangeEvent, useContext, useState } from "react";

import { Fieldset, Stack, Input, Button } from "@chakra-ui/react";
import { Field } from "./field";
import { signup } from "@/lib/signup";
import { redirect } from "next/navigation";
import { AuthContext } from "@/lib/auth-provider";

export const SignupForm = ({
  shouldRedirect = false,
  formLegend = "Sign up",
}: {
  shouldRedirect?: boolean;
  formLegend?: string;
}) => {
  const {
    username = "",
    jobTitle = "",
    updateContext,
  } = useContext(AuthContext);

  const [usernameInput, setUsernameInput] = useState<string>(username);
  const [jobTitleInput, setJobTitleInput] = useState<string>(jobTitle);

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsernameInput(e.target.value);
  };

  const handleJobTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setJobTitleInput(e.target.value);
  };

  const handleSubmit = () => {
    signup({ username: usernameInput, jobTitle: jobTitleInput });
    updateContext?.({ username: usernameInput, jobTitle: jobTitleInput });

    if (shouldRedirect) {
      redirect("/information");
    }
  };

  return (
    <Fieldset.Root
      size="lg"
      padding="30px"
      backgroundColor="#fff"
      maxW="60vw"
      alignSelf="center"
    >
      <Stack>
        <Fieldset.Legend>{formLegend}</Fieldset.Legend>
        <Fieldset.HelperText>
          Please provide your details below.
        </Fieldset.HelperText>
      </Stack>

      <Fieldset.Content flexDirection="row">
        <Field label="Username">
          <Input
            name="username"
            onChange={handleUsernameChange}
            value={usernameInput || username}
          />
        </Field>

        <Field label="Job title">
          <Input
            name="job_title"
            onChange={handleJobTitleChange}
            value={jobTitleInput || jobTitle}
          />
        </Field>
      </Fieldset.Content>

      <Button type="submit" alignSelf="flex-start" onClick={handleSubmit}>
        Save
      </Button>
    </Fieldset.Root>
  );
};
