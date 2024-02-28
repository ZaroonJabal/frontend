import { create } from "zustand";

export const useAppStore = create((set) => ({
  searchItem: "",
  errorMessage: "",
  setSearchItem: (searchItem) => set(() => ({ searchItem })),
  setErrorMessage: (errorMessage) => set(() => ({ errorMessage })),
}));
