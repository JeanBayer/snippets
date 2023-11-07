import { type FC, type ChangeEvent } from "react";
import classNames from "classnames";

import type { Snippet } from "../../types";

import styles from "./SnippetFilesCreate.module.css";

type Props = {
  files: Snippet["files"];
  selectedFileId: string;
  handleClick: (id: string) => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  addFile: () => void;
};

export const SnippetFilesCreate: FC<Props> = ({
  files,
  selectedFileId,
  handleClick,
  handleChange,
  addFile,
}) => {
  return (
    <div className={styles.snippetFilesCreate}>
      {files?.map(({ id, fileName }) => (
        <input
          key={id}
          name={id}
          className={classNames(styles.fileName, {
            [styles.active]: selectedFileId === id,
          })}
          type="text"
          value={fileName}
          onClick={() => {
            handleClick(id);
          }}
          onChange={handleChange}
        />
      ))}

      <button
        onClick={(e) => {
          e.preventDefault();
          addFile();
        }}
      >
        +
      </button>
    </div>
  );
};
