import { type FC } from "react";

import { Stack } from "../../components";
import type { Snippet } from "../../types";

import styles from "./ListStack.module.css";

type Props = {
  stacks: Snippet["stack"];
};

export const ListStack: FC<Props> = ({ stacks }) => {
  return (
    <ul className={styles.ul}>
      {stacks.map((stack) => (
        <Stack key={stack.img} img={stack.img} title={stack.name} />
      ))}
    </ul>
  );
};
