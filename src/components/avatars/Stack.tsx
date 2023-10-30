import { type FC } from "react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

import styles from "./Stack.module.css";

type Props = {
  title: string;
  img: string;
};

export const Stack: FC<Props> = ({ title, img }) => {
  return (
    <li>
      <img
        src={img}
        alt={title}
        className={styles.img}
        data-tooltip-id={title}
      />
      <Tooltip id={title} place="top">
        {title}
      </Tooltip>
    </li>
  );
};
