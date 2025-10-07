import { create } from 'zustand';
import { AuthState } from 'shared/types/Meeting';

export const useAuthStore = create<AuthState>((set, get) => ({
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
}));
