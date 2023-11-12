import { useMutation, useQuery } from "@tanstack/react-query";

import { QUERY_KEYS, useStore } from "../state";
import { snippetService, stackService } from "../services";
import { Snippet } from "../types";

export const useGlobalState = () => {
  const userId = useStore((state) => state.userId);

  const snippets = useQuery({
    queryKey: ["LIST", QUERY_KEYS.SNIPPETS, userId],
    queryFn: () => snippetService.getByUserID(userId),
  });

  const snippetCreateMutation = useMutation({
    mutationKey: ["CREATE", QUERY_KEYS.SNIPPETS, userId],
    mutationFn: (data: Snippet) => snippetService.create(data),
    onSuccess: () => {
      snippets.refetch();
    },
  });

  const stacks = useQuery({
    queryKey: [QUERY_KEYS.STACKS],
    queryFn: stackService.getAll,
  });

  return {
    snippets: {
      isLoading: snippets.isLoading,
      isError: snippets.isError,
      data: snippets.data,
      create: snippetCreateMutation.mutate,
    },
    stacks: {
      isLoading: stacks.isLoading,
      isError: stacks.isError,
      data: stacks.data,
    },
  };
};
