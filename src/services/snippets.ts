import { api } from "../services";

import type { Snippet } from "../types";

const getByUserID = async (userId: string): Promise<Snippet[]> => {
  const { data } = await api.get<Snippet[]>(`/snippets?userId=${userId}`);
  return data;
};

export const snippetService = {
  getByUserID,
};
