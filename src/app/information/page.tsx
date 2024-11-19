"use client";

import { useState } from "react";
import { useQuery } from "@apollo/client";

import {
  Center,
  Container,
  Grid,
  Heading,
  HStack,
  Stack,
  Image,
  Card,
} from "@chakra-ui/react";

import { GET_CHARACTERS } from "@/lib/gql-queries";
import { Skeleton, SkeletonText } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "@/components/ui/pagination";

export default function Information() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, loading } = useQuery(GET_CHARACTERS, {
    variables: { page: currentPage },
    fetchPolicy: "cache-and-network",
  });

  const onPageChange = (details: { page: number; pageSize: number }) => {
    setCurrentPage(details.page);
  };

  return (
    <Container>
      <Stack rowGap="20px" paddingBottom="24px">
        <Center>
          <Heading size="3xl">Information</Heading>
        </Center>
        <Grid
          gridTemplateColumns="repeat(auto-fit, minmax(240px, 1fr))"
          gap="24px"
          rowGap="48px"
        >
          {loading
            ? Array.from({ length: 10 }).map((_, index) => (
                <Stack key={index}>
                  <Skeleton height="260px" width="260px" />
                  <SkeletonText noOfLines={2} width="260px" />
                </Stack>
              ))
            : data?.characters?.results?.map((char: any) => (
                <Card.Root key={char.id} maxW="sm" overflow="hidden">
                  <Image src={char.image} alt={char.name} />
                  <Card.Body gap="2">
                    <Card.Title mt="2">{char.name}</Card.Title>
                    <Card.Description>Status: {char.status}</Card.Description>
                  </Card.Body>
                  <Card.Footer justifyContent="flex-end">
                    <Button variant="outline">View</Button>
                  </Card.Footer>
                </Card.Root>
              ))}
        </Grid>
        {!loading ? (
          <Center>
            <PaginationRoot
              count={data?.characters?.info?.count ?? 0}
              pageSize={20}
              page={currentPage}
              onPageChange={onPageChange}
            >
              <HStack>
                <PaginationPrevTrigger />
                <PaginationItems />
                <PaginationNextTrigger />
              </HStack>
            </PaginationRoot>
          </Center>
        ) : null}
      </Stack>
    </Container>
  );
}
