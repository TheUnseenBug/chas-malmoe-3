import { create } from "zustand";

interface AccessState {
  accessToken: string;
  addAccessToken: (key: string) => void;
  code: string;
  addCode: (key: string) => void;
}

const useAccessStore = create<AccessState>((set) => ({
  accessToken: "",
  code: "",
  addAccessToken: (token: string) =>
    set(() => ({
      accessToken: token,
    })),
  addCode: (code: string) =>
    set(() => ({
      code: code,
    })),
}));

export default useAccessStore;
