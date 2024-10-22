import { StateCreator } from "zustand";

export interface ICollapsedSlice {
  collapsed: boolean;
  setCollapsed: (data: boolean) => void;
}

export const createCollapsedSlice: StateCreator<ICollapsedSlice> = (set) => ({
  collapsed: false,
  setCollapsed: (data) => set({ collapsed: data }),
});

export default createCollapsedSlice;
