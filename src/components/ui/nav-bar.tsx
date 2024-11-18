import { HStack, Text, Link } from "@chakra-ui/react";

interface NavBarProps {
  username: string;
  jobTitle: string;
}

export const NavBar = ({ username, jobTitle }: NavBarProps) => {
  return (
    <HStack
      as="nav"
      justifyContent="flex-end"
      bg="#269ca5"
      paddingEnd="12px"
      minH="40px"
    >
      Click to edit:
      <Link href="/update-user" variant="underline" colorPalette="yellow">
        <Text color="#fff">{username}</Text>
        <Text color="#fff">{jobTitle}</Text>
      </Link>
    </HStack>
  );
};
