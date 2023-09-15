import { create } from "zustand";

export type Role = "dev" | "po" | "viewer";

type UserStore = {
  name: string;
  role: Role;
  userId: string;
  modal: boolean;
  setUserName: (name: string) => void;
  setUser: (user: { role: Role; userId: string; modal: boolean }) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  name: "",
  role: "viewer",
  userId: "",
  modal: true,
  setUserName: (name: string) => set({ name }),
  setUser: ({ role, userId, modal }) => set({ role, userId, modal }),
}));
