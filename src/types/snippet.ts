type Stack = {
  id: string;
  name: string;
  img: string;
};

type File = {
  id: string;
  fileName: string;
  code: string;
};

export type Snippet = {
  id: string;
  userId: string;
  title: string;
  stack: Stack[];
  files: File[];
};
