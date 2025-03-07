import { create } from "zustand";

interface AccessState {
  accessToken: string;
  addAccessToken: (key: string) => void;
}

const useAccessStore = create<AccessState>((set) => ({
  accessToken: "",
  addAccessToken: (token: string) =>
    set(() => ({
      accessToken: token,
    })),
}));

export default useAccessStore;
