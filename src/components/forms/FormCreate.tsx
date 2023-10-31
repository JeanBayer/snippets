import React, { FC, useState } from "react";

import { Code } from "../../components";
import type { Stack } from "../../types";

import styles from "./FormCreate.module.css";

type Props = {
  stacks: Stack[];
  onSubmit: (data: {
    titulo: string;
    selectedStacks: Record<string, boolean>;
    fileName: string;
    code: string;
  }) => void;
};

export const FormCreate: FC<Props> = ({ stacks, onSubmit }) => {
  const [titulo, setTitulo] = useState("");
  const [selectedStacks, setSelectedStacks] = useState<Record<string, boolean>>(
    {},
  );
  const [fileName, setFileName] = useState("");
  const [code, setCode] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // validate form data

    onSubmit({
      titulo,
      selectedStacks,
      fileName,
      code,
    });
  };

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

      <label>
        <span>File Name:</span>
        <input
          type="text"
          placeholder="index.tsx"
          value={fileName}
          onChange={(event) => {
            setFileName(event.target.value);
          }}
        />
      </label>

      <label className={styles.containerCode}>
        <span>Code:</span>
        <Code
          file={{
            id: crypto.randomUUID(),
            fileName,
            code,
          }}
          readOnly={false}
          onChange={(value) => {
            setCode(value);
          }}
        />
      </label>

      <input type="submit" value="Crear" />
    </form>
  );
};
