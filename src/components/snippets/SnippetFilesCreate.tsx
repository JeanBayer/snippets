import { type FC } from "react";
import classNames from "classnames";

import type { File, UUID } from "../../types";

import styles from "./SnippetFilesCreate.module.css";

type Props = {
  files: Record<string, File>;
  selectedFileId: UUID;
  handleClick: (id: UUID) => void;
  handleDelete: (id: UUID) => void;
  addFile: () => void;
  register: any;
};

export const SnippetFilesCreate: FC<Props> = ({
  files,
  selectedFileId,
  handleClick,
  handleDelete,
  addFile,
  register,
}) => {
  return (
    <div className={styles.snippetFilesCreate}>
      {Object.values(files)?.map(({ id }) => (
        <div
          key={id}
          className={styles.fileContainer}
          onFocus={() => {
            handleClick(id);
          }}
        >
          <input
            name={id}
            className={classNames(styles.fileName, {
              [styles.active]: selectedFileId === id,
            })}
            type="text"
            onClick={() => {
              handleClick(id);
            }}
            {...register(`files.${id}.fileName`, {
              required: true,
            })}
          />
          <button
            className={classNames(styles.deleteButton, {
              [styles.activeButton]: selectedFileId === id,
            })}
            onClick={(e) => {
              e.preventDefault();
              handleDelete(id);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={styles.deleteIcon}
              width="20"
              height="20"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#ffffff"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M18 6l-12 12" />
              <path d="M6 6l12 12" />
            </svg>
          </button>
        </div>
      ))}

      <button
        style={{
          flexShrink: 0,
        }}
        onClick={(e) => {
          e.preventDefault();
          addFile();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#ffffff"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M12 5l0 14" />
          <path d="M5 12l14 0" />
        </svg>
      </button>
    </div>
  );
};
