"use client";
import { Center, Container, Grid, Heading } from "@chakra-ui/react";

import { useQuery, gql } from "@apollo/client";

import { GET_CHARACTERS } from "@/lib/gql-queries";

import { Skeleton } from "@/components/ui/skeleton";

export default function Information() {
  const { data, loading } = useQuery(GET_CHARACTERS, {
    variables: { page: 1 },
  });

  if (loading) {
    return <Skeleton />;
  }

  return (
    <Container>
      <Center>
        <Heading>Information</Heading>
        <Grid></Grid>
      </Center>
    </Container>
  );
}
