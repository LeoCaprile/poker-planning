import { create } from "zustand";
import { UserRoleT, UserRoles } from "../types";

type UserStore = {
  name: string;
  role: UserRoleT;
  userId: string;
  modal: boolean;
  setUserName: (name: string) => void;
  setUser: (user: { role: UserRoleT; userId: string; modal: boolean }) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  name: "",
  role: UserRoles.viewer,
  userId: "",
  modal: true,
  setUserName: (name: string) => set({ name }),
  setUser: ({ role, userId, modal }) => set({ role, userId, modal }),
}));
