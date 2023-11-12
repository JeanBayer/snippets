import type { Stack } from "../types";

export type UUID = `${string}-${string}-${string}-${string}-${string}`;

export type File = {
  id: UUID;
  fileName: string;
  code: string;
};

export type Snippet = {
  id: UUID;
  userId: string;
  title: string;
  stack: Stack[];
  files: File[];
};
