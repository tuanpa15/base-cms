import { IProfile } from "utils/interface/auth";
import { StateCreator } from "zustand";

export interface IProfileSlice {
  profile: IProfile;
  setProfile: (data: IProfile) => void;
}

export const createProfileSlice: StateCreator<IProfileSlice> = (set) => ({
  profile: {} as IProfile,
  setProfile: (data) => set({ profile: data }),
});

export default createProfileSlice;
