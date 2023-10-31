import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS, useStore } from "../state";
import { languageService, snippetService, stackService } from "../services";

export const useGlobalState = () => {
  const userId = useStore((state) => state.userId);

  const snippets = useQuery({
    queryKey: [QUERY_KEYS.SNIPPETS, userId],
    queryFn: () => snippetService.getByUserID(userId),
  });

  const stacks = useQuery({
    queryKey: [QUERY_KEYS.STACKS],
    queryFn: stackService.getAll,
  });

  const languages = useQuery({
    queryKey: [QUERY_KEYS.LANGUAGES],
    queryFn: languageService.getAll,
  });

  return {
    snippets: {
      isLoading: snippets.isLoading,
      isError: snippets.isError,
      data: snippets.data,
    },
    stacks: {
      isLoading: stacks.isLoading,
      isError: stacks.isError,
      data: stacks.data,
    },
    languages: {
      isLoading: languages.isLoading,
      isError: languages.isError,
      data: languages.data,
    },
  };
};
