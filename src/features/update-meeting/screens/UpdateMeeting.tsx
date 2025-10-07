import React, { useEffect, useState } from 'react';
import {
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  View,
  ActivityIndicator,
} from 'react-native';
import { styles } from 'update-meeting/styles/UpdateMeeting.styles';
import MeetingService from 'shared/services/MeetingService';
import UserService from '@/shared/services/UserService';
import { useNavigation } from '@react-navigation/native';
import { Meeting, MeetingType, UserType } from '@/shared/types/Meeting';
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
import { MeetingFormData, meetingSchema } from '@/shared/schema/Meeting';

const UpdateMeeting = ({ route }: any) => {
  const { meetingId } = route.params;
  const [, setMeeting] = useState<Meeting | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDateTimeOpen, setIsDateTimeOpen] = useState(false);
  const [isReminderOpen, setIsReminderOpen] = useState(false);
  const [isParticipantsOpen, setIsParticipantsOpen] = useState(false);
  const [allUsers, setAllUsers] = useState<UserType[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<MeetingFormData>({
    resolver: zodResolver(meetingSchema),
    mode: 'onChange',
  });

  // Fetch meeting data and users
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchedMeeting, users] = await Promise.all([
          MeetingService.getMeetingById(meetingId),
          UserService.getUsers(),
        ]);

        setMeeting(fetchedMeeting);
        setAllUsers(users);

        const meetingDate = new Date(fetchedMeeting.dateTime);

        // Map participant IDs to full user objects
        const selectedParticipants = users.filter(user =>
          fetchedMeeting.participants?.includes(user.uid),
        );

        // Set form values
        setValue('title', fetchedMeeting.title);
        setValue('meetingType', fetchedMeeting.type as MeetingType);
        setValue('date', meetingDate);
        setValue('time', meetingDate);
        setValue('link', fetchedMeeting.link || '');
        setValue('notes', fetchedMeeting.notes || '');
        setValue('reminder', fetchedMeeting.reminder);
        setValue('participants', selectedParticipants);
      } catch (err) {
        setError('Failed to load meeting details.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [meetingId, setValue]);

  const watchedMeetingType = watch('meetingType');
  const watchedParticipants = watch('participants');
  const watchedDate = watch('date');
  const watchedTime = watch('time');

  // Navigation hook

  const navigation = useNavigation();

  const handleUpdateMeeting = async (data: MeetingFormData) => {
    if (!meetingId) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const meetingDateTime = new Date(data.date);
      meetingDateTime.setHours(data.time.getHours());
      meetingDateTime.setMinutes(data.time.getMinutes());

      const meetingData = {
        title: data.title,
        type: data.meetingType,
        dateTime: meetingDateTime.toISOString(),
        link: data.meetingType === 'online' ? data.link : '',
        notes: data.notes,
        reminder: data.reminder,
        participants: data.participants.map(user => user.uid),
      };

      await MeetingService.updateMeeting(meetingId, meetingData);
      Alert.alert('Success', 'Meeting updated successfully!');
      navigation.goBack();
    } catch (err) {
      const errorMsg = err as Error;
      setError(errorMsg.message || 'An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#7c3aed" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <MeetingTitleInput control={control} titleError={errors.title} />

      <DateTimeField
        errors={errors}
        watchedDate={watchedDate}
        watchedTime={watchedTime}
        setisDateTimeOpen={setIsDateTimeOpen}
      />

      <MeetingTypeField control={control} />

      <ReminderField
        error={errors.reminder}
        control={control}
        setIsReminderOpen={setIsReminderOpen}
      />

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

      {error && <Text style={styles.errorText}>{error}</Text>}

      <TouchableOpacity
        style={[
          styles.submitButton,
          (!isValid || isSubmitting) && styles.submitButtonDisabled,
        ]}
        onPress={handleSubmit(handleUpdateMeeting)}
        disabled={!isValid || isSubmitting}
      >
        <Text style={styles.submitButtonText}>
          {isSubmitting ? 'Updating Meeting...' : 'Update Meeting'}
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

export default UpdateMeeting;
