import type { FC } from "react";
import type { Snippet } from "../../types";

import styles from "./SnippetFiles.module.css";

type Props = {
  files: Snippet["files"];
  handleClick: (id: string) => void;
};

export const SnippetFiles: FC<Props> = ({ files, handleClick }) => {
  return (
    <div className={styles.snippetFiles}>
      {files?.map(({ id, fileName }) => (
        <button
          className={styles.fileName}
          onClick={() => handleClick(id)}
          key={id}
        >
          {fileName}
        </button>
      ))}
    </div>
  );
};
