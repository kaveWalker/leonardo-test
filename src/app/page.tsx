"use client";

import { AbsoluteCenter } from "@chakra-ui/react";

import { SignupForm } from "@/components/ui/signup-form";
import { useContext } from "react";
import { AuthContext } from "@/lib/auth-provider";

export default function Home() {
  const { username, jobTitle } = useContext(AuthContext);

  if (!username || !jobTitle) {
    return (
      <AbsoluteCenter>
        <SignupForm shouldRedirect />
      </AbsoluteCenter>
    );
  }
}
