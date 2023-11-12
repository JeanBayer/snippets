import { useForm } from "react-hook-form";

import { generateId } from "../utils";
import type { UUID, Snippet, Stack } from "../types";

type FormValues = {
  titulo: string;
  selectedStacks: Record<string, boolean>;
  files: Record<UUID, Snippet["files"][0]>;
  selectedIdFile: UUID;
};

type Props = {
  stacks: Stack[];
};

const initialID = generateId();

export function useFormCreate({ stacks }: Props) {
  const { register, handleSubmit, setValue, watch } = useForm<FormValues>({
    defaultValues: {
      titulo: "",
      selectedStacks: {
        [stacks[0].id]: false,
      },
      files: {
        [initialID]: {
          code: "",
          fileName: "index.tsx",
          id: initialID,
        },
      },
      selectedIdFile: initialID,
    },
  });

  const [files, selectedIdFile] = watch(["files", "selectedIdFile"]);

  const updateFile = (id: UUID, data: Partial<Snippet["files"][0]>) => {
    const newFiles = structuredClone(files);
    newFiles[id] = {
      ...newFiles[id],
      ...data,
    };
    setValue("files", newFiles);
  };

  const addFile = () => {
    const newId = generateId();
    setValue(`files.${newId}`, {
      code: "",
      fileName: "newFile.ts",
      id: newId,
    });
  };

  const deleteFile = (id: UUID) => {
    const newFiles = structuredClone(files);

    if (Object.keys(newFiles).length === 1) return;

    const listFilesIds = Object.keys(newFiles);
    const indexSelectedFile = listFilesIds.findIndex((fileId) => fileId === id);
    const nextSelectedFileId = listFilesIds.at(indexSelectedFile - 1);

    if (!nextSelectedFileId) return;

    delete newFiles[id];

    setValue("selectedIdFile", nextSelectedFileId as UUID);
    setValue("files", newFiles);
  };

  const addSelectedId = (id: UUID) => {
    setValue("selectedIdFile", id);
  };

  type ValidateForm =
    | {
        isValid: false;
        field: string;
        message: string;
        values?: undefined;
      }
    | {
        isValid: true;
        values: {
          titulo: string;
          selectedStacks: Record<string, boolean>;
          files: Snippet["files"];
        };
        message?: string;
      };

  const validateForm = (data: FormValues): ValidateForm => {
    if (!Object.values(data.selectedStacks).some((value) => value === true))
      return {
        isValid: false,
        field: "selectedStacks[id]",
        message: "Debes seleccionar al menos un stack",
      };

    const filesValues = Object.values(files);

    if (!filesValues.every(({ code }) => code.trim() !== ""))
      return {
        isValid: false,
        field: "files.[id].code",
        message: "No debes tener archivos vacíos",
      };

    return {
      isValid: true,
      values: {
        titulo: data.titulo,
        selectedStacks: data.selectedStacks,
        files: filesValues,
      },
    };
  };

  return {
    files,
    selectedIdFile,

    addFile,
    addSelectedId,
    deleteFile,
    handleSubmit,
    register,
    updateFile,
    validateForm,
  };
}
