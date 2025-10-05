import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import DateTimePicker from 'react-native-ui-datepicker';
import { styles } from '../styles/UpdateMeeting.styles';
import { updateMeeting } from 'shared/services/FirebaseService';
import MaterialIcons from '@react-native-vector-icons/material-icons';

type MeetingType = 'online' | 'offline';

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.inputLabelContainer}>
    <Text style={styles.label}>{children?.toString().replace('*', '')}</Text>
    {children?.toString().includes('*') && (
      <Text style={styles.required}>*</Text>
    )}
  </View>
);

const Toggle = ({
  value,
  onChange,
}: {
  value: MeetingType;
  onChange: (value: MeetingType) => void;
}) => {
  const isOnline = value === 'online';
  return (
    <View style={[styles.row, styles.gap12]}>
      {(['offline', 'online'] as MeetingType[]).map(option => (
        <TouchableOpacity
          key={option}
          onPress={() => onChange(option)}
          activeOpacity={0.8}
          style={[
            styles.toggleButton,
            {
              borderColor:
                isOnline === (option === 'online') ? '#7c3aed' : '#e5e5ea',
            },
            {
              backgroundColor:
                isOnline === (option === 'online')
                  ? 'rgba(124,58,237,0.08)'
                  : '#fff',
            },
          ]}
        >
          <Text style={{ color: option === value ? '#7c3aed' : '#111' }}>
            {option === 'online' ? 'Online' : 'Offline'}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const UpdateMeeting = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Prefilled sample meeting
  const [title, setTitle] = useState('Product Demo');
  const [meetingType, setMeetingType] = useState<MeetingType>('online');
  const [date, setDate] = useState<Date | null>(new Date());
  const [time, setTime] = useState<Date | null>(new Date());
  const [link, setLink] = useState('https://meet.example.com/meeting-link');
  const [notes, setNotes] = useState(
    'Prepare client presentation slides before the meeting.',
  );
  const [reminder, setReminder] = useState<
    'none' | '5m' | '10m' | '30m' | '1h'
  >('10m');
  const [isDateTimeOpen, setIsDateTimeOpen] = useState(false);
  const [isReminderOpen, setIsReminderOpen] = useState(false);
  const [isParticipantsOpen, setIsParticipantsOpen] = useState(false);
  const [participants, setParticipants] = useState<string[]>(['SK', 'YS']);

  const isValid = useMemo(() => {
    if (!title.trim()) return false;
    if (!date || !time) return false;
    if (meetingType === 'online' && !link.trim()) return false;
    return true;
  }, [title, date, time, meetingType, link]);

  const handleUpdateMeeting = async () => {
    // Placeholder for meetingId, in a real app this would come from navigation params or props
    const meetingId = 'YOUR_MEETING_ID_HERE'; 

    if (!isValid) {
      setError('Please fill in all required fields.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const meetingDateTime = new Date(date || '');
      meetingDateTime.setHours(time?.getHours() || 0);
      meetingDateTime.setMinutes(time?.getMinutes() || 0);

      const meetingData = {
        title,
        meetingType,
        dateTime: meetingDateTime.toISOString(),
        link: meetingType === 'online' ? link : '',
        notes,
        reminder,
        participants,
      };

      const result = await updateMeeting(meetingId, meetingData);
      if (result.success) {
        console.log('Meeting updated successfully');
        // Optionally navigate to another screen or show a success message
        // navigation.goBack(); // Example navigation
      } else {
        setError(result.error?.message || 'Failed to update meeting.');
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Update Meeting</Text>

      <View style={styles.fieldContainer}>
        <SectionLabel>Meeting Title*</SectionLabel>
        <TextInput
          placeholder="Enter meeting title"
          placeholderTextColor="#a3a3a3"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />
      </View>

      <View style={styles.fieldContainer}>
        <SectionLabel>Date and Time*</SectionLabel>
        <TouchableOpacity
          style={styles.dateTimeField}
          onPress={() => setIsDateTimeOpen(true)}
        >
          <View style={styles.dateTimeFieldTextContainer}>
            <MaterialIcons name="calendar-month" size={24} color={'#7c3aed'} />
            <Text style={styles.dateTimeFieldText}>
              {date
                ? `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`
                : 'Select date'}
            </Text>
          </View>
          <Text style={styles.separator}>|</Text>
          <View style={styles.dateTimeFieldTextContainer}>
            <MaterialIcons size={24} name="access-time" color={'#7c3aed'} />
            <Text style={styles.dateTimeFieldText}>
              {time
                ? time.toLocaleTimeString([], {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true,
                  })
                : 'Select time'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.fieldContainer}>
        <SectionLabel>Meeting type*</SectionLabel>
        <Toggle value={meetingType} onChange={setMeetingType} />
      </View>

      <View style={styles.fieldContainer}>
        <SectionLabel>Reminder</SectionLabel>
        <TouchableOpacity
          style={styles.input}
          onPress={() => setIsReminderOpen(true)}
        >
          <Text style={{ color: reminder === 'none' ? '#a3a3a3' : '#111' }}>
            {reminder === 'none'
              ? 'No reminder'
              : reminder === '5m'
              ? '5 minutes before'
              : reminder === '10m'
              ? '10 minutes before'
              : reminder === '30m'
              ? '30 minutes before'
              : '1 hour before'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.fieldContainer}>
        <SectionLabel>Participants</SectionLabel>
        <View style={[styles.row, styles.gap12]}>
          <View style={[styles.flex1, styles.input]}>
            <Text style={{ color: participants.length ? '#111' : '#a3a3a3' }}>
              {participants.length
                ? `${participants.length} participant${participants.length > 1 ? 's' : ''}`
                : 'no participants selected'}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => setIsParticipantsOpen(true)}
            style={styles.addButton}
          >
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
        {!!participants.length && (
          <View
            style={[
              styles.row,
              styles.gap8,
              { marginTop: 10, flexWrap: 'wrap' },
            ]}
          >
            {participants.map(p => (
              <View key={p} style={styles.chip}>
                <Text style={styles.chipText}>{p}</Text>
              </View>
            ))}
          </View>
        )}
      </View>

      {meetingType === 'online' && (
        <View style={styles.fieldContainer}>
          <SectionLabel>Link</SectionLabel>
          <TextInput
            placeholder="https://meet.example.com/meeting-link"
            placeholderTextColor="#a3a3a3"
            value={link}
            onChangeText={setLink}
            style={styles.input}
            autoCapitalize="none"
          />
        </View>
      )}

      <View style={styles.fieldContainer}>
        <SectionLabel>Note</SectionLabel>
        <TextInput
          placeholder="Add meeting notes"
          placeholderTextColor="#a3a3a3"
          value={notes}
          onChangeText={setNotes}
          style={[styles.input, styles.notesInput]}
          multiline
        />
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <TouchableOpacity
        style={[styles.submitButton, !isValid || isLoading ? styles.submitButtonDisabled : {}]}
        onPress={handleUpdateMeeting}
        disabled={!isValid || isLoading}
      >
        <Text style={styles.submitButtonText}>
          {isLoading ? 'Updating Meeting...' : 'Update Meeting'}
        </Text>
      </TouchableOpacity>

      {/* Date & time modal */}
      <Modal
        visible={isDateTimeOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsDateTimeOpen(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={[styles.modalCard]}>
            <View
              style={{
                padding: 12,
                borderBottomWidth: 1,
                borderBottomColor: '#e5e5ea',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={styles.modalTitle}>Select Date & Time</Text>
            </View>
            <DateTimePicker
              mode="single"
              date={date || new Date()}
              onChange={({ date: selectedDate }) => {
                if (selectedDate) {
                  const newDate = new Date(selectedDate.toString());
                  setDate(newDate);
                  setTime(newDate);
                }
              }}
              components={{
                Weekday(weekday) {
                  return (
                    <Text style={{ color: 'rgb(41 41 41)' }}>
                      {weekday.name.min.slice(0, 1)}
                    </Text>
                  );
                },
              }}
              weekdaysFormat="min"
              showOutsideDays={true}
              styles={{
                range_start: { color: 'white' },
                selected: { borderRadius: 10,height:40,width:40, backgroundColor: '#7B21FF' },
                selected_label: { color: 'white' },
                button_prev_image: { tintColor: '#454545' },
                button_next_image: { tintColor: '#454545' },
                month_selector_label: { fontSize: 18, color: '#454545' },
                year_selector_label: { fontSize: 18, color: '#454545' },
                day_label: { color: 'rgb(41 41 41)', fontSize: 12.5 },
                weekday_label: { color: 'rgb(41 41 41)', fontSize: 13 },
                outside_label: { color: 'rgb(173 173 173))', fontSize: 12.5 },
                month_label:{fontSize:12,color:'rgb(173 173 173))'}
              }}
              style={{ paddingHorizontal: 12, paddingVertical: 15, minHeight: 320 }}
            />
            <View
              style={{
                width: '100%',
                backgroundColor: '#e5e5ea',
                borderRadius: 0,
                padding: 0,
                height:1,
              }}
            />
            <DateTimePicker
              mode="single"
              hideHeader
              onChange={({ date: selectedDate }) => {
                if (selectedDate) {
                  const newDate = new Date(selectedDate.toString());
                  setTime(newDate);
                }
              }}
              use12Hours
              timePicker={true}
              initialView="time"
              styles={{
                time_selector_label: { width: 0, height: 0 },
                month_selector_label: { width: 0, height: 0 },
                year_selector_label: { width: 0, height: 0 },
              }}
              containerHeight={190}
              style={{ height: 200, justifyContent: 'flex-start' }}
            />
            <View
              style={[
                styles.row,
                styles.modalActions,
                {
                  padding: 16,
                  borderTopWidth: 1,
                  borderTopColor: '#e5e5ea',
                  justifyContent: 'center',
                },
              ]}
            >
              <TouchableOpacity
                onPress={() => setIsDateTimeOpen(false)}
                style={{
                  backgroundColor: '#7c3aed',
                  paddingVertical: 12,
                  paddingHorizontal: 32,
                  borderRadius: 24,
                }}
              >
                <Text style={{ color: '#fff', fontWeight: '600' }}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Reminder modal */}
      <Modal
        visible={isReminderOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsReminderOpen(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            {(['none', '5m', '10m', '30m', '1h'] as const).map(opt => (
              <TouchableOpacity
                key={opt}
                style={styles.listItem}
                onPress={() => {
                  setReminder(opt);
                  setIsReminderOpen(false);
                }}
              >
                <Text style={styles.listItemLabel}>
                  {opt === 'none'
                    ? 'No reminder'
                    : opt === '5m'
                      ? '5 minutes before'
                      : opt === '10m'
                        ? '10 minutes before'
                        : opt === '30m'
                          ? '30 minutes before'
                          : '1 hour before'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      {/* Participants modal */}
      <Modal
        visible={isParticipantsOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsParticipantsOpen(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={[styles.modalTitle, { marginBottom: 8 }]}>
              Add participants
            </Text>
            {['SK', 'YS', 'AB', 'CD', 'EF'].map(code => {
              const selected = participants.includes(code);
              return (
                <TouchableOpacity
                  key={code}
                  onPress={() => {
                    setParticipants(prev =>
                      prev.includes(code)
                        ? prev.filter(p => p !== code)
                        : [...prev, code],
                    );
                  }}
                  style={styles.listItem}
                >
                  <Text style={styles.listItemLabel}>{code}</Text>
                  <Text style={{ color: selected ? '#7c3aed' : '#a3a3a3' }}>
                    {selected ? 'Selected' : 'Select'}
                  </Text>
                </TouchableOpacity>
              );
            })}
            <TouchableOpacity
              onPress={() => setIsParticipantsOpen(false)}
              style={[
                styles.filledButton,
                { alignSelf: 'flex-end', marginTop: 12 },
              ]}
            >
              <Text style={styles.filledButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default UpdateMeeting;