"use client";

import { useContext, useState } from "react";
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

import { DetailModal } from "./detail-modal";
import { AuthContext } from "@/lib/auth-provider";

export default function Information() {
  const { username, jobTitle } = useContext(AuthContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [selectedCharId, setSelectedCharId] = useState<string>();

  const { data, loading } = useQuery(GET_CHARACTERS, {
    skip: !username || !jobTitle,
    variables: { page: currentPage },
    fetchPolicy: "cache-and-network",
  });

  const onPageChange = (details: { page: number; pageSize: number }) => {
    setCurrentPage(details.page);
    window.scrollTo({ top: 0 });
  };

  const modalOpenChange = (open: boolean) => {
    setOpenModal(open);
  };

  if (!username || !jobTitle) {
    return null;
  }

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
            : data?.characters?.results?.map(
                (char: {
                  id: string;
                  name: string;
                  status: string;
                  image: string;
                }) => (
                  <Card.Root key={char.id} maxW="sm" overflow="hidden">
                    <Image src={char.image} alt={char.name} />
                    <Card.Body gap="2">
                      <Card.Title mt="2">{char.name}</Card.Title>
                      <Card.Description>Status: {char.status}</Card.Description>
                    </Card.Body>
                    <Card.Footer justifyContent="flex-end">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSelectedCharId(char.id);
                          setOpenModal(true);
                        }}
                      >
                        View
                      </Button>
                    </Card.Footer>
                  </Card.Root>
                )
              )}
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
      <DetailModal
        open={openModal}
        charId={selectedCharId}
        setModalOpen={modalOpenChange}
      />
    </Container>
  );
}
