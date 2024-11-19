import { VStack } from "@chakra-ui/react";
import { DataListItem, DataListRoot } from "@/components/ui/data-list";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "@/components/ui/dialog";
import { useQuery } from "@apollo/client";
import { GET_CHARACTER_BY_ID } from "@/lib/gql-queries";
import { SkeletonText } from "@/components/ui/skeleton";

interface DetailModalProps {
  charId?: string;
  open?: boolean;
  setModalOpen?: (open: boolean) => void;
}

export const DetailModal = ({
  open,
  charId,
  setModalOpen,
}: DetailModalProps) => {
  const { data, loading } = useQuery(GET_CHARACTER_BY_ID, {
    variables: { id: charId },
    skip: !open || !charId,
    fetchPolicy: "cache-and-network",
  });

  return (
    <VStack alignItems="start">
      <DialogRoot
        lazyMount
        open={open}
        onOpenChange={(e) => setModalOpen?.(e.open)}
      >
        <DialogContent>
          {loading ? (
            <>
              <DialogHeader>
                <SkeletonText noOfLines={1} width="80%" />
              </DialogHeader>
              <DialogBody pb="8">
                <SkeletonText noOfLines={4} width="80%" />
              </DialogBody>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>{data?.character?.name}</DialogTitle>
              </DialogHeader>
              <DialogBody pb="8">
                <DataListRoot orientation="horizontal">
                  <DataListItem
                    label="Status"
                    value={data?.character?.status}
                  />
                  <DataListItem
                    label="Species"
                    value={data?.character?.species}
                  />
                  <DataListItem
                    label="Gender"
                    value={data?.character?.gender}
                  />
                </DataListRoot>
              </DialogBody>
            </>
          )}

          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </VStack>
  );
};
