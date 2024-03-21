import { create } from "zustand";

type RoomState = {
  confetti: boolean;
  showConfetti: () => void;
};

const useRoomStore = create<RoomState>((set) => ({
  confetti: false,
  showConfetti: () => {
    set({ confetti: true });

    setTimeout(() => {
      set({ confetti: false });
    }, 3000);
  },
}));

export default useRoomStore;
