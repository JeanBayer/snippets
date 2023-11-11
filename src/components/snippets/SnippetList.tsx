import { type FC } from "react";

import { SnippetCard } from "../../components";
import type { Snippet } from "../../types";

import styles from "./SnippetList.module.css";

type Props = {
  snippets: Snippet[] | undefined;
};

export const SnippetList: FC<Props> = ({ snippets }) => {
  return (
    <section className={styles.section}>
      {snippets?.map((snippet) => (
        <SnippetCard key={snippet.id} snippet={snippet} />
      ))}
    </section>
  );
};
