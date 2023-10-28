import { create } from "zustand";

type State = {
  userId: string;
  setUserId: (userId: State["userId"]) => void;
};

export const useStore = create<State>((set, get) => ({
  userId: "516dab70-153c-4258-9ecf-2621d419305e",
  setUserId: (userId: string) => set({ userId }),
}));
