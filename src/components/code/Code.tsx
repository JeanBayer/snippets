import { type FC } from "react";
import Editor from "@monaco-editor/react";

import { CopyIcon } from "../../components";
import type { Snippet } from "../../types";

import styles from "./Code.module.css";

type Props = {
  file: Snippet["files"][0];
  readOnly?: boolean;
  onChange?: (value: any) => void;
};

export const Code: FC<Props> = ({
  file,
  readOnly = false,
  onChange = () => {},
}) => {
  return (
    <div className={styles.code}>
      <Editor
        theme="vs-dark"
        path={file?.fileName}
        onChange={onChange}
        defaultValue={file?.code}
        options={{ readOnly, minimap: { enabled: false } }}
      />
      <CopyIcon style={styles.copyIcon} text={file?.code!} />
    </div>
  );
};
