import type { Language, Stack } from "../types";

type File = {
  id: string;
  fileName: string;
  code: string;
  language: Language;
};

export type Snippet = {
  id: string;
  userId: string;
  title: string;
  stack: Stack[];
  files: File[];
};
