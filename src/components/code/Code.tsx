import { PropsWithChildren, type FC } from "react";
import Editor from "@monaco-editor/react";

import type { Snippet } from "../../types";

import styles from "./Code.module.css";

type Props = {
  file: Snippet["files"][0];
  readOnly?: boolean;
  onChange?: (value: any) => void;
};

export const Code: FC<PropsWithChildren<Props>> = ({
  children,
  file,
  readOnly = false,
  onChange = () => {},
}) => {
  return (
    <div className={styles.containerCode}>
      <div className={styles.code}>
        <Editor
          theme="vs-dark"
          path={`${file?.id}/${file?.fileName}`}
          onChange={onChange}
          defaultValue={file?.code}
          options={{ readOnly, minimap: { enabled: false } }}
        />
        {children}
      </div>
    </div>
  );
};
