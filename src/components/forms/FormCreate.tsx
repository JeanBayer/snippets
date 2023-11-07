import React, { FC, useState } from "react";
import { toast } from "react-toastify";

import { Code, DeleteIcon, SnippetFilesCreate } from "../../components";
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

    setSelectedIdFile(newFiles[0].id);
    setFiles(newFiles);
  };

  if (!selectedFile) throw new Error("File not found");

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label>
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

      <fieldset>
        <legend>Stacks</legend>
        {stacks?.map((stack) => {
          return (
            <label key={stack.id}>
              <input
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
            </label>
          );
        })}
      </fieldset>

      <fieldset
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <legend>Files</legend>

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
        />

        <div
          style={{
            height: 500,
            display: "flex",
            flexDirection: "column",
            gap: 5,
          }}
        >
          <label className={styles.containerCode}>
            <span>Code:</span>
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
            >
              <DeleteIcon
                style={styles.copyIcon}
                handleDelete={() => deleteFile(selectedFile?.id)}
              />
            </Code>
          </label>
        </div>
      </fieldset>

      <input type="submit" value="Crear" />
    </form>
  );
};
