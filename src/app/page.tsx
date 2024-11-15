import {
  Button,
  Fieldset,
  Input,
  Stack,
  AbsoluteCenter,
} from "@chakra-ui/react";
import { Field } from "@/components/ui/field";

export default function Home() {
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
            <Input name="username" />
          </Field>

          <Field label="Job title">
            <Input name="job_title" />
          </Field>
        </Fieldset.Content>

        <Button type="submit" alignSelf="flex-start">
          Save
        </Button>
      </Fieldset.Root>
    </AbsoluteCenter>
  );
}
