import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, ScrollView } from 'react-native';
import MeetingService from 'shared/services/MeetingService';
import UserService from 'auth/services/UserService';
import { Meeting, UserType } from '@/shared/types/Meeting';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/shared/navigation/types/common';
import { useAuthStore } from '@/shared/store/useAuthStore';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import MeetingTitleInput from '@/shared/components/meeting/MeetingTitleInput';
import DateTimeField from '@/shared/components/meeting/DateTimeField';
import MeetingTypeField from '@/shared/components/meeting/MeetingTypeField';
import ReminderField from '@/shared/components/meeting/ReminderField';
import ParticipantsField from '@/shared/components/meeting/ParticipantsField';
import LinkField from '@/shared/components/meeting/LinkField';
import NotesField from '@/shared/components/meeting/NotesField';
import DateTimeModal from '@/shared/components/meeting/DateTimeModal';
import ReminderModal from '@/shared/components/meeting/ReminderModal';
import ParticipantsModal from '@/shared/components/meeting/ParticipantsModal';
import { meetingSchema, type MeetingFormData } from '@/shared/schema/Meeting';
import { styles } from '@/shared/styles/Meeting.styles';

const CreateMeeting = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDateTimeOpen, setIsDateTimeOpen] = useState(false);
  const [isReminderOpen, setIsReminderOpen] = useState(false);
  const [isParticipantsOpen, setIsParticipantsOpen] = useState(false);
  const [allUsers, setAllUsers] = useState<UserType[]>([]);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { user } = useAuthStore();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<MeetingFormData>({
    resolver: zodResolver(meetingSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      meetingType: 'online',
      date: undefined,
      time: undefined,
      link: '',
      notes: '',
      reminder: 'none',
      participants: [],
    },
  });

  const watchedMeetingType = watch('meetingType');
  const watchedParticipants = watch('participants');
  const watchedDate = watch('date');
  const watchedTime = watch('time');

  useEffect(() => {
    UserService.getUsers().then(val => setAllUsers(val));
  }, []);

  const onSubmit = async (data: MeetingFormData) => {
    setIsLoading(true);
    try {
      const meetingDateTime = new Date(data.date);
      meetingDateTime.setHours(data.time.getHours());
      meetingDateTime.setMinutes(data.time.getMinutes());

      const meetingData: Meeting = {
        title: data.title,
        type: data.meetingType,
        dateTime: meetingDateTime.toISOString(),
        link: data.meetingType === 'online' ? data.link : '',
        notes: data.notes,
        reminder: data.reminder,
        participants: data.participants,
        ownerUid: user?.uid,
      };

      await MeetingService.createMeeting(meetingData);
      navigation.goBack();
    } catch (err) {
      const erro = err as Error;
      console.error(erro.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <MeetingTitleInput control={control} titleError={errors.title} />
      <DateTimeField
        errors={errors}
        setisDateTimeOpen={setIsDateTimeOpen}
        watchedDate={watchedDate}
        watchedTime={watchedTime}
      />
      <MeetingTypeField control={control} />
      <ReminderField control={control}  error={errors.reminder} setIsReminderOpen={setIsReminderOpen} />
      <ParticipantsField
        control={control}
        watchedParticipants={watchedParticipants}
        allUsers={allUsers}
        errors={errors}
        setIsParticipantsOpen={setIsParticipantsOpen}
      />

      {watchedMeetingType === 'online' && (
        <LinkField control={control} errors={errors} />
      )}

      <NotesField control={control} />
      <TouchableOpacity
        disabled={!isValid || isLoading}
        onPress={handleSubmit(onSubmit)}
        style={[
          styles.primaryButton,
          (!isValid || isLoading) && styles.primaryButtonDisabled,
        ]}
      >
        <Text style={styles.primaryButtonText}>
          {isLoading ? 'Creating...' : 'Create meeting'}
        </Text>
      </TouchableOpacity>
      <DateTimeModal
        isOpen={isDateTimeOpen}
        setIsOpen={setIsDateTimeOpen}
        watchedDate={watchedDate}
        setValue={setValue}
      />

      <ReminderModal
        isOpen={isReminderOpen}
        onClose={() => setIsReminderOpen(false)}
        onSelect={reminder => {
          setValue('reminder', reminder);
          setIsReminderOpen(false);
        }}
      />

      <ParticipantsModal
        isOpen={isParticipantsOpen}
        setIsOpen={setIsParticipantsOpen}
        setValue={setValue}
        allUsers={allUsers}
        watchedParticipants={watchedParticipants}
      />
    </ScrollView>
  );
};

export default CreateMeeting;