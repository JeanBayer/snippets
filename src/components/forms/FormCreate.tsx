import { FC } from "react";
import { toast } from "react-toastify";
import { Tooltip } from "react-tooltip";
import { useForm } from "react-hook-form";

import { Code, SnippetFilesCreate } from "../../components";
import { generateId } from "../../utils";
import { Snippet, UUID, type Stack } from "../../types";

import styles from "./FormCreate.module.css";

type Props = {
  stacks: Stack[];
  onSubmit: (data: {
    titulo: string;
    selectedStacks: Record<string, boolean>;
    files: Snippet["files"];
  }) => void;
};

const initialID = generateId();

type FormValues = {
  titulo: string;
  selectedStacks: Record<string, boolean>;
  files: Record<UUID, Snippet["files"][0]>;
  selectedIdFile: UUID;
};

export const FormCreate: FC<Props> = ({ stacks, onSubmit }) => {
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

  const handleSubmitData = ({ titulo, selectedStacks, files }: FormValues) => {
    if (!Object.values(selectedStacks).some((value) => value === true))
      return toast.error("Debes seleccionar al menos un stack");

    const filesValues = Object.values(files);

    if (!filesValues.every(({ code }) => code !== ""))
      return toast.error("Debes agregar al menos un archivo");

    // onSubmit({
    //   titulo,
    //   selectedStacks,
    //   files: filesValues,
    // });
  };

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

    if (Object.keys(newFiles).length === 1)
      return toast.error("No puedes eliminar todos los archivos");

    const listFilesIds = Object.keys(newFiles);
    const indexSelectedFile = listFilesIds.findIndex((fileId) => fileId === id);
    const nextSelectedFileId = listFilesIds.at(indexSelectedFile - 1);

    delete newFiles[id];

    if (!nextSelectedFileId) return;

    setValue("selectedIdFile", nextSelectedFileId as UUID);
    setValue("files", newFiles);
  };

  console.log("1");

  return (
    <form onSubmit={handleSubmit(handleSubmitData)} className={styles.form}>
      <h2>Crea tu Snippet</h2>
      <hr />

      <label className={styles.inputTitulo}>
        <span>Titulo:</span>
        <input
          type="text"
          placeholder="Clipboard in javascript"
          {...register("titulo", { required: true })}
        />
      </label>

      <div className={styles.fieldSetContainerStacks}>
        <legend>Stacks:</legend>
        <div className={styles.containerInputStacks}>
          {stacks?.map((stack) => {
            return (
              <label
                className={styles.inputStack}
                key={stack.id}
                data-tooltip-id={stack.id}
              >
                <input
                  className={styles.check}
                  type="checkbox"
                  {...register(`selectedStacks.${stack.id}`)}
                />
                <span>{stack.name}</span>
                <Tooltip id={stack.id} place="top">
                  {stack.name}
                </Tooltip>
              </label>
            );
          })}
        </div>
      </div>
      <SnippetFilesCreate
        files={files}
        selectedFileId={selectedIdFile}
        handleClick={(id) => {
          setValue("selectedIdFile", id);
        }}
        addFile={addFile}
        handleDelete={deleteFile}
        register={register}
      />

      <div className={styles.fieldSetContainerSnippet}>
        <legend>Files:</legend>
        <div className={styles.containerCode}>
          <Code
            file={{
              id: selectedIdFile,
              fileName: files[selectedIdFile]?.fileName,
              code: files[selectedIdFile]?.code,
            }}
            readOnly={false}
            onChange={(value) => {
              updateFile(selectedIdFile, {
                code: value,
              });
            }}
          />
        </div>
      </div>

      <input type="submit" value="Crear" />
    </form>
  );
};
