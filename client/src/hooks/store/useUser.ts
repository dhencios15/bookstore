import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { User } from "../../utils/types";

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useUser = create<UserState>()(
  devtools(
    persist((set) => ({
      user: null,
      setUser: (user) => set(() => ({ user })),
    }))
  )
);
