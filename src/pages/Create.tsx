import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { useGlobalState } from "../state";
import { FormCreate } from "../components";
import {
  createFile,
  generateId,
  matchIdsWithStacks,
  selectIdsFromObject,
  sleep,
} from "../utils";

export const CreatePage = () => {
  const { stacks, snippets } = useGlobalState();
  const navigate = useNavigate();

  const handleSubmit = async (dataForm: any) => {
    const selectedStacksIds = selectIdsFromObject(dataForm.selectedStacks);
    const selectedStacks = matchIdsWithStacks({
      stackIds: selectedStacksIds,
      stackConstruct: (stackId) => {
        return stacks.data?.find((stack) => stack.id === stackId);
      },
    });

    const files = [
      createFile({
        fileName: dataForm.fileName,
        code: dataForm.code,
      }),
    ];

    snippets.create({
      id: generateId(),
      userId: "516dab70-153c-4258-9ecf-2621d419305e",
      title: dataForm.titulo,
      stack: selectedStacks,
      files,
    });

    toast.success(`Snippet ${dataForm.titulo} creado correctamente`);
    await sleep(2000);
    navigate("/");
  };

  if (!stacks.data) return <div>Loading...</div>;

  return (
    <main>
      <FormCreate stacks={stacks.data} onSubmit={handleSubmit} />
    </main>
  );
};
