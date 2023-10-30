import { useState, type FC } from "react";
import classNames from "classnames";

import type { Snippet } from "../../types";

import styles from "./SnippetFiles.module.css";

type Props = {
  files: Snippet["files"];
  handleClick: (id: string) => void;
};

export const SnippetFiles: FC<Props> = ({ files, handleClick }) => {
  const [selectedFileId, setSelectedFileId] = useState(files[0].id);

  return (
    <div className={styles.snippetFiles}>
      {files?.map(({ id, fileName }) => (
        <button
          className={classNames(styles.fileName, {
            [styles.active]: selectedFileId === id,
          })}
          onClick={() => {
            handleClick(id);
            setSelectedFileId(id);
          }}
          key={id}
        >
          {fileName}
        </button>
      ))}
    </div>
  );
};
