import { Stack } from "../types";

type SelectedStacksId = {
  [stackId: string]: boolean;
};

export const selectIdsFromObject = (
  selectedStacksId: SelectedStacksId,
): string[] => {
  return Object.entries(selectedStacksId)
    .filter(([, value]) => value === true)
    .map(([key]) => key);
};

type MatchIdsWithStacksProps = {
  stackIds: string[];
  stackConstruct: (id: string) => Stack | undefined;
};

export const matchIdsWithStacks = ({
  stackIds,
  stackConstruct,
}: MatchIdsWithStacksProps): Stack[] => {
  const stacks = stackIds.map(stackConstruct);
  if (stacks.includes(undefined) || stacks.length === 0) {
    throw new Error("Stack not found");
  }

  return stacks as Stack[];
};
