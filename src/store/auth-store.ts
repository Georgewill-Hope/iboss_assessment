import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type AuthState = {
  username: string;
  isAuthenticated: boolean;
  hasHydrated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  setHasHydrated: (value: boolean) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      username: "",
      isAuthenticated: false,
      hasHydrated: false,

      login: (username, password) => {
        if (username === "Admin" && password === "12345") {
          set({ username, isAuthenticated: true });
          return true;
        }
        return false;
      },

      logout: () => {
        set({
          username: "",
          isAuthenticated: false,
        });
      },

      setHasHydrated: (value) => {
        set({ hasHydrated: value });
      },
    }),
    {
      name: "nook-admin-auth",
      storage: createJSONStorage(() => localStorage),

      partialize: (state) => ({
        username: state.username,
        isAuthenticated: state.isAuthenticated,
      }),

      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
