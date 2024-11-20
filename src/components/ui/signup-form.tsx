import { FormEvent, useContext } from "react";

import { Fieldset, Stack, Input, Button, Center } from "@chakra-ui/react";
import { Field } from "./field";
import { signup } from "@/lib/signup";
import { redirect } from "next/navigation";

import { AuthContext } from "@/lib/auth-provider";

const usernameField = "username";
const jobTitleField = "job_title";

export const SignupForm = ({
  shouldRedirect = false,
  formLegend = "Sign up",
}: {
  shouldRedirect?: boolean;
  formLegend?: string;
}) => {
  const {
    username: usernameState = "",
    jobTitle: jobTitleState = "",
    updateContext,
  } = useContext(AuthContext);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const username = formData.get(usernameField)?.toString()?.trim();
    const jobTitle = formData.get(jobTitleField)?.toString()?.trim();

    if (username?.length && jobTitle?.length) {
      signup({ username, jobTitle });
      updateContext?.({ username, jobTitle });
    }

    if (shouldRedirect) {
      redirect("/information");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Center>
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
            <Field label="Username" required>
              <Input
                name={usernameField}
                defaultValue={usernameState}
                aria-label="username"
              />
            </Field>

            <Field label="Job title" required>
              <Input
                name={jobTitleField}
                defaultValue={jobTitleState}
                aria-label="job title"
              />
            </Field>
          </Fieldset.Content>

          <Button type="submit" alignSelf="flex-start">
            Save
          </Button>
        </Fieldset.Root>
      </Center>
    </form>
  );
};
