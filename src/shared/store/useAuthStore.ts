import { create } from 'zustand';

interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (firebaseUser: User | null) => void;
  clearUser: () => void;
  getUserEmail: () => string | null;
}

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
