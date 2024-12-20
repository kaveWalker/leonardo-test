import { HStack, Text, Link } from "@chakra-ui/react";

interface NavBarProps {
  username: string;
  jobTitle: string;
}

export const NavBar = ({ username, jobTitle }: NavBarProps) => {
  return (
    <HStack
      as="nav"
      justifyContent="space-between"
      bg="#269ca5"
      paddingX="24px"
      minH="42px"
    >
      <Link href="/" color="#000080">
        Home
      </Link>
      <HStack>
        <Text>Click to edit:</Text>
        <Link href="/update-user" variant="underline">
          <Text color="#000080">{username}</Text>
          <Text color="#000080">{jobTitle}</Text>
        </Link>
      </HStack>
    </HStack>
  );
};
