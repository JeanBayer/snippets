import { api } from ".";

import type { Stack } from "../types";

const getAll = async (): Promise<Stack[]> => {
  const { data } = await api.get<Stack[]>(`/stacks`);
  return data;
};

export const stackService = {
  getAll,
};
