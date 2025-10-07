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