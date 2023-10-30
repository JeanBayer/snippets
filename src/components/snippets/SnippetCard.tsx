import { type FC, useState } from "react";

import { CopyIcon, SnippetFiles } from "../../components";
import type { Snippet } from "../../types";

import styles from "./SnippetCard.module.css";

type Props = {
  snippet: Snippet;
};

export const SnippetCard: FC<Props> = ({ snippet }) => {
  const [selectedFile, setSelectedFile] = useState(snippet.files[0]);

  const handleClick = (selectedFileId: string) => {
    const newSelectedFile = snippet.files.find(
      ({ id }) => id === selectedFileId,
    );
    if (!newSelectedFile) throw new Error("File not found");
    setSelectedFile(newSelectedFile);
  };

  return (
    <article className={styles.article}>
      <h3 className={styles.title}>{snippet.title}</h3>
      <div className={styles.snippets}>
        <SnippetFiles files={snippet.files} handleClick={handleClick} />
        <code className={styles.code}>
          <CopyIcon styles={styles.copyIcon} text={selectedFile?.code!} />
          <pre>{selectedFile?.code}</pre>
        </code>
      </div>
    </article>
  );
};
