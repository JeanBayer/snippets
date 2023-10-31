import { api } from ".";

import type { Language } from "../types";

const getAll = async (): Promise<Language[]> => {
  const { data } = await api.get<Language[]>(`/languages`);
  return data;
};

export const languageService = {
  getAll,
};
