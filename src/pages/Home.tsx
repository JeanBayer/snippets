import { useGlobalState } from "../state";
import { SnippetList } from "../components";

export const HomePage = () => {
  const { snippets } = useGlobalState();

  if (snippets.isLoading) return <main>loading...</main>;
  if (snippets.isError) return <main>error</main>;

  return (
    <main>
      <SnippetList snippets={snippets.data} />
    </main>
  );
};
