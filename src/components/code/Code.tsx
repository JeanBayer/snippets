import { type FC } from "react";
import Editor from "@monaco-editor/react";

import { CopyIcon } from "../../components";
import type { Snippet } from "../../types";

import styles from "./Code.module.css";

type Props = {
  file: Snippet["files"][0];
  readOnly?: boolean;
};

export const Code: FC<Props> = ({ file, readOnly = false }) => {
  return (
    <div className={styles.code}>
      <Editor
        theme="vs-dark"
        path={file?.fileName}
        onChange={(value) => {
          console.log(value);
        }}
        defaultLanguage={file?.language}
        defaultValue={file?.code}
        options={{ readOnly, minimap: { enabled: false } }}
      />
      <CopyIcon style={styles.copyIcon} text={file?.code!} />
    </div>
  );
};
