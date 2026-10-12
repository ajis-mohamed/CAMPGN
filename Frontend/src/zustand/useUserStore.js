import { create } from 'zustand';

const useUserStore = create((set) => ({
  user: null,
  accountType: null,

  setUser: (newUser) => set({ user: newUser }),
  setAccountType: (newType) => set({ accountType: newType }),
  setAuthState: (user, accountType) => set({ user, accountType }),
}));

export default useUserStore;
