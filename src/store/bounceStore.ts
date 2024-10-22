import { create } from "zustand";
import createProfileSlice, { IProfileSlice } from "./slice/profile";
import createCollapsedSlice, { ICollapsedSlice } from "./slice/collapsed";

const useBounceStore = create<IProfileSlice & ICollapsedSlice>()(
  (...action) => ({
    ...createProfileSlice(...action),
    ...createCollapsedSlice(...action),
  })
);

export default useBounceStore;
