import { generateId } from "../utils";

type CreateFileProps = {
  fileName: string;
  code: string;
};

export const createFile = ({ fileName, code }: CreateFileProps) => {
  return {
    id: generateId(),
    fileName,
    code,
  };
};
