import { Control, UseFormSetValue, FieldErrors } from 'react-hook-form';
import { MeetingFormData, ReminderType } from 'shared/schema/Meeting';
import { Meeting, UserType } from './Meeting';
import { MeetingType } from './Meeting';
import { ReactNode } from 'react';

export type DateTimeModalProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  watchedDate: Date | undefined;
  setValue: UseFormSetValue<MeetingFormData>;
};

export interface ReminderFieldProps {
  control: Control<any>;
  setIsReminderOpen: React.Dispatch<React.SetStateAction<boolean>>;
  error?: { message?: string };
}

export interface ReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (reminder: ReminderType) => void;
}

export type ParticipantsModalProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setValue: UseFormSetValue<MeetingFormData>;
  watchedParticipants: UserType[];
  allUsers: UserType[];
};

export type ParticipantsFieldProps = {
  control: Control<MeetingFormData>;
  watchedParticipants: UserType[];
  allUsers: UserType[];
  errors: FieldErrors<MeetingFormData>;
  setIsParticipantsOpen: (open: boolean) => void;
};

export type NotesFieldProps = {
  control: Control<MeetingFormData>;
  errors: FieldErrors<MeetingFormData>;
};

export interface MeetingTitleInputProps {
  control: Control<MeetingFormData>;
  errors: FieldErrors<MeetingFormData>;
}

export type LinkFieldProps = {
  control: Control<MeetingFormData>;
  errors: FieldErrors<MeetingFormData>;
  watchedType: MeetingType;
};

export interface DateTimeFieldProps {
  setisDateTimeOpen: React.Dispatch<React.SetStateAction<boolean>>;
  watchedDate: Date;
  watchedTime: Date;
  errors: FieldErrors<MeetingFormData>;
}

export interface MeetingTypeFieldProps {
  control: Control<MeetingFormData>;
}

export interface ToggleProps {
  value: MeetingType;
  onChange: (value: MeetingType) => void;
}

export interface MeetingItemProps {
  item: Meeting;
  onDelete: (id: string) => void;
}

export interface DateTimeFieldProps {
  setisDateTimeOpen: React.Dispatch<React.SetStateAction<boolean>>;
  watchedDate: Date;
  watchedTime: Date;
  errors: FieldErrors<MeetingFormData>;
}

export interface MeetingTitleInputProps {
  control: Control<MeetingFormData>;
  titleError: FieldErrors<MeetingFormData>['title'];
}

export interface MeetingTypeFieldProps {
  control: Control<MeetingFormData>;
}

export interface ThemeProviderProps {
  children: ReactNode;
}
