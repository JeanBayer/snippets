import type { FC } from "react";
import classNames from "classnames";

import styles from "./DeleteIcon.module.css";

type Props = {
  handleDelete: () => void;
  style?: string;
};

export const DeleteIcon: FC<Props> = ({ style = "", handleDelete }) => {
  const className = classNames(style, styles.deleteIcon);

  return (
    <button
      className={className}
      onClick={(e) => {
        e.preventDefault();
        handleDelete();
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={styles.svg}
        width="36"
        height="36"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="#ffffff"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14z" />
        <path d="M9 9l6 6m0 -6l-6 6" />
      </svg>
    </button>
  );
};
