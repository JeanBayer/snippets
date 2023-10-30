import { useGlobalState, withState } from "./state";

import { SnippetList } from "./components";

import "./App.css";

function App() {
  const { snippets } = useGlobalState();

  if (snippets.isLoading) return <main>loading...</main>;
  if (snippets.isError) return <main>error</main>;

  return (
    <main>
      <SnippetList snippets={snippets.data} />
    </main>
  );
}

export default withState(App);
