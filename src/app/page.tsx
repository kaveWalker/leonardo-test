"use client";

import { AbsoluteCenter } from "@chakra-ui/react";

import { SignupForm } from "@/components/ui/signup-form";

export default function Home() {
  return (
    <AbsoluteCenter>
      <SignupForm shouldRedirect />
    </AbsoluteCenter>
  );
}
