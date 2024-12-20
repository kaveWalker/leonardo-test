"use client";

import React, { createContext, useEffect, useState } from "react";

import { usePathname, useRouter } from "next/navigation";
import { AbsoluteCenter, Spinner, Stack } from "@chakra-ui/react";
import { NavBar } from "@/components/ui/nav-bar";

import { getUser } from "./signup";

interface AuthContext {
  username?: string;
  jobTitle?: string;
  updateContext?: (newState: { username: string; jobTitle: string }) => void;
}

export const AuthContext = createContext<AuthContext>({});

export const AuthProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const router = useRouter();
  const pathname = usePathname();

  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [jobTitle, setJobTitle] = useState("");

  const updateContext = ({
    username,
    jobTitle,
  }: {
    username: string;
    jobTitle: string;
  }) => {
    setUsername(username);
    setJobTitle(jobTitle);
  };

  useEffect(() => {
    const { username, jobTitle } = getUser();

    if (username && jobTitle) {
      setUsername(username);
      setJobTitle(jobTitle);
      if (pathname === "/") {
        router.push("/information");
      }
    } else {
      router.push("/");
    }
    setIsLoading(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <AbsoluteCenter>
        <Spinner size="md" />
      </AbsoluteCenter>
    );
  }

  return (
    <AuthContext.Provider value={{ username, jobTitle, updateContext }}>
      <Stack>
        {username && jobTitle && (
          <NavBar username={username} jobTitle={jobTitle} />
        )}
        <>{children}</>
      </Stack>
    </AuthContext.Provider>
  );
};
