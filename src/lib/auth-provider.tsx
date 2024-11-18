"use client";

import React, { createContext, useEffect, useState } from "react";

import { redirect, useRouter } from "next/navigation";
import { getUser } from "./signup";
import { Spinner } from "@chakra-ui/react";

export const AuthContext = createContext({ username: "", jobTitle: "" });

export const AuthProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [jobTitle, setJobTitle] = useState("");

  useEffect(() => {
    const { username, jobTitle } = getUser();

    if (username && jobTitle) {
      setIsLoading(false);
      setUsername(username);
      setJobTitle(jobTitle);
      router.push("/information");
    } else {
      setIsLoading(false);
      router.push("/");
    }
  }, []);

  if (isLoading) {
    return <Spinner size="md" />;
  }

  return (
    <AuthContext.Provider value={{ username, jobTitle }}>
      {children}
    </AuthContext.Provider>
  );
};
