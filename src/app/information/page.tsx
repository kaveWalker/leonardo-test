"use client";

import { useState } from "react";

import {
  Center,
  Container,
  Grid,
  Heading,
  HStack,
  Stack,
  Image,
} from "@chakra-ui/react";

import { useQuery } from "@apollo/client";

import { GET_CHARACTERS } from "@/lib/gql-queries";

import { Skeleton } from "@/components/ui/skeleton";

import { DataListItem, DataListRoot } from "@/components/ui/data-list";

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

  if (loading) {
    return <Skeleton />;
  }

  return (
    <Container>
      <Stack rowGap="20px">
        <Center>
          <Heading size="3xl">Information</Heading>
        </Center>

        <Grid
          gridTemplateColumns="repeat(auto-fit, minmax(240px, 1fr))"
          gap="24px"
        >
          {data?.characters?.results?.map((char: any) => (
            <Stack key={char.id} borderWidth="1px" borderRadius="5px">
              <Image src={char.image} alt={char.name} />
              <DataListRoot orientation="horizontal" padding="12px">
                <DataListItem label="Name:" value={char.name} />
                <DataListItem label="Status:" value={char.status} />
              </DataListRoot>
            </Stack>
          ))}
        </Grid>
        <PaginationRoot
          count={data.characters.info.count}
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
      </Stack>
    </Container>
  );
}
