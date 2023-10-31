import type { Language } from "../types";

type Stack = {
  id: string;
  name: string;
  img: string;
};

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
