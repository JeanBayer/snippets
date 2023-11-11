import React, { FC, useState } from "react";
import { toast } from "react-toastify";
import { Tooltip } from "react-tooltip";

import { Code, SnippetFilesCreate } from "../../components";
import { generateId } from "../../utils";
import { Snippet, type Stack } from "../../types";

import styles from "./FormCreate.module.css";

type Props = {
  stacks: Stack[];
  onSubmit: (data: {
    titulo: string;
    selectedStacks: Record<string, boolean>;
    files: Snippet["files"];
  }) => void;
};

export const FormCreate: FC<Props> = ({ stacks, onSubmit }) => {
  const [titulo, setTitulo] = useState("");
  const [selectedStacks, setSelectedStacks] = useState<Record<string, boolean>>(
    {},
  );
  const [files, setFiles] = useState<Snippet["files"]>([
    {
      code: "",
      fileName: "index.tsx",
      id: generateId(),
    },
  ]);

  const [selectedIdFile, setSelectedIdFile] = useState(files[0].id);

  const selectedFile = files.find(({ id }) => id === selectedIdFile);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // validate form data

    onSubmit({
      titulo,
      selectedStacks,
      files,
    });
  };

  const updateFile = (id: string, data: Partial<Snippet["files"][0]>) => {
    const newFiles = files.map((file) => {
      if (file.id === id) {
        return {
          ...file,
          ...data,
        };
      }

      return file;
    });

    setFiles(newFiles);
  };

  const addFile = () => {
    setFiles([
      ...files,
      {
        code: "",
        fileName: "newFile.ts",
        id: generateId(),
      },
    ]);
  };

  const deleteFile = (id: string) => {
    const newFiles = files.filter((file) => file.id !== id);
    if (newFiles.length === 0)
      return toast.error("No puedes eliminar todos los archivos");

    const leftFileIndex = files.findIndex((file) => file.id === id) - 1;
    setSelectedIdFile(newFiles.at(leftFileIndex)?.id || newFiles[0].id);
    setFiles(newFiles);
  };

  if (!selectedFile) throw new Error("File not found");

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label className={styles.inputTitulo}>
        <span>Titulo:</span>
        <input
          type="text"
          placeholder="Clipboard in javascript"
          value={titulo}
          onChange={(event) => {
            setTitulo(event.target.value);
          }}
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
                  id={stack.id}
                  value={stack.id}
                  checked={selectedStacks[stack?.id] === true}
                  onChange={(event) => {
                    setSelectedStacks({
                      ...selectedStacks,
                      [stack.id]: event.target.checked,
                    });
                  }}
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

      <div className={styles.fieldSetContainerSnippet}>
        <legend>Files:</legend>

        <SnippetFilesCreate
          files={files}
          selectedFileId={selectedIdFile}
          handleClick={(id) => setSelectedIdFile(id)}
          handleChange={(event) => {
            updateFile(event.target.name, {
              fileName: event.target.value,
            });
          }}
          addFile={addFile}
          handleDelete={() => deleteFile(selectedFile?.id)}
        />

        <div className={styles.containerCode}>
          <Code
            file={{
              id: selectedFile?.id,
              fileName: selectedFile?.fileName,
              code: selectedFile?.code,
            }}
            readOnly={false}
            onChange={(value) => {
              updateFile(selectedFile?.id, {
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