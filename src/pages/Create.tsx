import { useGlobalState } from "../state";
import { FormCreate } from "../components";

export const CreatePage = () => {
  const { stacks } = useGlobalState();

  const handleSubmit = (dataForm: any) => {
    const selectedStacksObject = Object.entries(dataForm.selectedStacks)
      .filter(([, value]) => value === true)
      .map(([key]) => {
        return stacks.data?.find((stack) => stack.id === key);
      });

    const files = [
      {
        id: crypto.randomUUID(),
        fileName: dataForm.fileName,
        code: dataForm.code,
      },
    ];

    const data = {
      id: crypto.randomUUID(),
      userId: "516dab70-153c-4258-9ecf-2621d419305e",
      title: dataForm.titulo,
      stacks: selectedStacksObject,
      files,
    };
    console.log(data);
  };

  if (!stacks.data) return <div>Loading...</div>;

  return (
    <main>
      <FormCreate stacks={stacks.data} onSubmit={handleSubmit} />
    </main>
  );
};
