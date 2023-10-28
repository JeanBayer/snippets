import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS, useStore } from "../state";
import { snippetService } from "../services";

export const useGlobalState = () => {
  const userId = useStore((state) => state.userId);

  const snippets = useQuery({
    queryKey: [QUERY_KEYS.SNIPPETS, userId],
    queryFn: () => snippetService.getByUserID(userId),
  });

  return {
    snippets: {
      isLoading: snippets.isLoading,
      isError: snippets.isError,
      data: snippets.data,
    },
  };
};
