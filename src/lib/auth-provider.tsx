"use client";

import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import { useRouter } from "next/navigation";
import { Spinner, Stack } from "@chakra-ui/react";
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
    } else {
      router.push("/");
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <Spinner size="md" />;
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
