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
import { SignupForm } from "@/components/ui/signup-form";

export default function Home() {
  return (
    <AbsoluteCenter>
      <SignupForm shouldRedirect />
    </AbsoluteCenter>
  );
}
