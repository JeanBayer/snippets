type File = {
  id: string;
  fileName: string;
  code: string;
};

export type Snippet = {
  id: string;
  userId: string;
  title: string;
  files: File[];
};
