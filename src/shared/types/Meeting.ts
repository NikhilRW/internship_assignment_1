export type Meeting = MeetingPayload;

export type MeetingPayload = {
  title: string;
  dateTime: string;
  type: 'online' | 'offline';
  link?: string;
  notes?: string;
  reminder: 'none' | '5m' | '10m' | '30m' | '1h';
  participants: string[];
  ownerUid?: string;
  id?:string
};

interface UserType {
  uid: string;
  name: string;
  email: string;
  photoURL?: string;
}

export type { UserType };

type MeetingType = 'online' | 'offline';
export type { MeetingType };

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
export type MeetingData = {
  title: string;
  dateTime: string;
  meetingType: 'online' | 'offline';
  link?: string;
  reminder: 'none' | '15-minutes' | '30-minutes' | '1-hour' | string;
  participants: string[];
}
export type { AuthState , User};