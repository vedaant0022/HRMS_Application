import { create } from 'zustand';

const useUserStore = create((set) => ({
  user: null, // initial state
  setUser: (userData) => set({ user: userData }), // setter
  clearUser: () => set({ user: null }), // logout/reset
}));

export default useUserStore;
