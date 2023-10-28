import { useGlobalState, withState } from "./state";

import "./App.css";

function App() {
  const { snippets } = useGlobalState();

  if (snippets.isLoading) return <main>loading...</main>;
  if (snippets.isError) return <main>error</main>;

  return (
    <main>
      <code>
        <pre>{JSON.stringify(snippets.data, null, 2)}</pre>
      </code>
    </main>
  );
}

export default withState(App);
