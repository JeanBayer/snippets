import { FC } from "react";
import { toast } from "react-toastify";
import { Tooltip } from "react-tooltip";

import { Code, SnippetFilesCreate } from "../../components";
import { useFormCreate } from "../../hooks";
import type { Snippet, Stack } from "../../types";

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
  const {
    files,
    selectedIdFile,

    addFile,
    addSelectedId,
    deleteFile,
    handleSubmit,
    register,
    updateFile,
    validateForm,
  } = useFormCreate({
    stacks,
  });

  const handleSubmitForm = handleSubmit(
    (data) => {
      const { isValid, message, values } = validateForm(data);
      if (!isValid) return toast.error(message);
      onSubmit(values);
    },
    (errors) => {
      if (errors.titulo)
        return toast.error("Debes agregar un titulo al snippet");

      if (errors.files)
        return toast.error(
          "Debes agregar al menos un nombre de archivo al snippet",
        );
    },
  );

  return (
    <form onSubmit={handleSubmitForm} className={styles.form}>
      <h2>Crea tu Snippet</h2>
      <hr />

      <label className={styles.inputTitulo}>
        <span>Titulo:</span>
        <input
          type="text"
          placeholder="Clipboard in javascript"
          {...register("titulo", { required: "El titulo es obligatorio" })}
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

      <div className={styles.fieldSetContainerSnippet}>
        <legend>Files:</legend>
        <SnippetFilesCreate
          files={files}
          selectedFileId={selectedIdFile}
          handleClick={addSelectedId}
          addFile={addFile}
          handleDelete={deleteFile}
          register={register}
        />
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

      <input type="submit" value="Crear" />
    </form>
  );
};
