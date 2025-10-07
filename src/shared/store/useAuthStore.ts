import { create } from 'zustand';
import { persist, createJSONStorage, StateStorage } from 'zustand/middleware';
import { AuthState } from 'shared/types/Meeting';
import { MMKV } from 'react-native-mmkv';

const sessionStorage: StateStorage = {
  getItem(name) {
    const value = new MMKV().getString(name);
    return value || '';
  },
  removeItem(name) {
    new MMKV().delete(name);
  },
  setItem(name, value) {
    new MMKV().set(name, value);
  },
};

export const useAuthStore = create(
  persist<AuthState>(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      setUser: firebaseUser =>
        set({
          user: firebaseUser
            ? {
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                displayName: firebaseUser.displayName,
                photoURL: firebaseUser.photoURL,
              }
            : null,
          isAuthenticated: !!firebaseUser,
        }),
      clearUser: () =>
        set({
          user: null,
          isAuthenticated: false,
        }),
      getUserEmail: () => get().user?.email || null,
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
