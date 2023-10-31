import type { FC } from "react";
import { toast } from "react-toastify";
import classNames from "classnames";

import { copy } from "../../utils";
import styles from "./CopyIcon.module.css";

type Props = {
  text: string;
  style?: string;
  handleCallback?: (res: { success: boolean }) => void;
};

export const CopyIcon: FC<Props> = ({
  text = "",
  style = "",
  handleCallback,
}) => {
  const handleCopyClick = async () => {
    try {
      copy(text);
      toast.success("Copied to clipboard!");
      handleCallback?.({ success: true });
    } catch (err) {
      toast.error("Something went wrong");
      handleCallback?.({ success: false });
    }
  };

  const className = classNames(style, styles.copyIcon);

  return (
    <button className={className} onClick={handleCopyClick}>
      <svg
        className={styles.svg}
        xmlns="http://www.w3.org/2000/svg"
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
        <path d="M8 8m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z" />
        <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" />
      </svg>
    </button>
  );
};
