import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Modal, Image, Alert } from 'react-native';
import { styles } from '../styles/UpdateMeeting.styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../shared/navigation/types/common';
import { updateMeeting } from '../../../shared/services/FirebaseService';
import UserService from 'shared/services/UserService';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface User {
    uid: string;
    name: string;
    email: string;
    photoURL?: string;
}

type Props = NativeStackScreenProps<RootStackParamList, 'UpdateMeeting'>

type MeetingType = 'online' | 'offline'

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
    <View style={styles.inputLabelContainer}>
        <Text style={styles.label}>{children?.toString().replace('*', '')}</Text>
        {children?.toString().includes('*') && (
            <Text style={styles.required}>*</Text>
        )}
    </View>
);

const Toggle = ({ value, onChange }: { value: MeetingType; onChange: (value: MeetingType) => void }) => {
    return (
        <View style={[styles.row, styles.gap12]}>
            {(['offline', 'online'] as MeetingType[]).map(option => (
                <TouchableOpacity
                    key={option}
                    onPress={() => onChange(option)}
                    activeOpacity={0.8}
                    style={[
                        styles.toggleButton,
                        { borderColor: value === option ? '#7c3aed' : '#e5e5ea' },
                        { backgroundColor: value === option ? 'rgba(124,58,237,0.08)' : '#fff' },
                    ]}
                >
                    <Text style={{ color: value === option ? '#7c3aed' : '#111' }}>{option === 'online' ? 'Online' : 'Offline'}</Text>
                </TouchableOpacity>
            ))}
        </View>
    )
}

const UpdateMeeting = ({ route }: Props) => {
    const { meetingId } = route.params

    const [title, setTitle] = useState('')
    const [meetingType, setMeetingType] = useState<MeetingType>('online')
    const [date, setDate] = useState<Date | null>(new Date())
    const [time, setTime] = useState<Date | null>(new Date())
    const [link, setLink] = useState('')
    const [notes, setNotes] = useState('')
    const [reminder, setReminder] = useState<'none' | '5m' | '10m' | '30m' | '1h'>('10m')
    const [isDateTimeOpen, setIsDateTimeOpen] = useState(false)
    const [isReminderOpen, setIsReminderOpen] = useState(false)
    const [isParticipantsOpen, setIsParticipantsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [allUsers, setAllUsers] = useState<User[]>([]);
    const [participants, setParticipants] = useState<User[]>([]);

    useEffect(() => {
        const fetchUsersAndMeeting = async () => {
            try {
                const users = await UserService.getUsers();
                setAllUsers(users);

                const meeting = await MeetingService.getMeetingById(meetingId);
                if (meeting) {
                    setTitle(meeting.title);
                    setMeetingType(meeting.meetingType);
                    setDate(new Date(meeting.dateTime));
                    setTime(new Date(meeting.dateTime));
                    setLink(meeting.link || '');
                    setNotes(meeting.notes || '');
                    setReminder(meeting.reminder);
                    setParticipants(meeting.participants || []);
                }
            } catch (err) {
                console.error("Error fetching data:", err);
                setError('Failed to load meeting details or users.');
            }
        };
        fetchUsersAndMeeting();
    }, [meetingId]);

    const isValid = useMemo(() => {
        if (!title.trim()) return false;
        if (!date || !time) return false;
        if (meetingType === 'online' && !link.trim()) return false;
        if (reminder !== 'none' && !participants.length) return false;
        return true;
    }, [title, date, time, meetingType, link, reminder, participants]);

    const handleUpdateMeeting = async () => {
        if (!isValid) {
            setError('Please fill in all required fields.');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const meetingDateTime = new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate(),
                time.getHours(),
                time.getMinutes()
            );

            const updatedMeeting = {
                id: meetingId,
                title,
                meetingType,
                dateTime: meetingDateTime.toISOString(),
                link: meetingType === 'online' ? link : '',
                notes,
                reminder,
                participants,
            };

            const result = await updateMeeting(meetingId, updatedMeeting);
            if (result.success) {
                Alert.alert('Success', 'Meeting updated successfully!');
                navigation.goBack();
            } else {
                setError(result.error?.message || 'Failed to update meeting.');
            }
        } catch (err: any) {
            console.error('Error updating meeting:', err);
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.contentContainer}>
            <Text style={styles.title}>Update Meeting</Text>

            {error && <Text style={styles.errorText}>{error}</Text>}

            <View style={styles.fieldContainer}>
                <SectionLabel>Meeting Title*</SectionLabel>
                <TextInput placeholder="Enter meeting title" placeholderTextColor="#a3a3a3" value={title} onChangeText={setTitle} style={styles.input} />
            </View>

            <View style={styles.fieldContainer}>
                <SectionLabel>Date and Time</SectionLabel>
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
                <TouchableOpacity style={styles.input} onPress={() => setIsReminderOpen(true)}>
                    <Text style={{ color: reminder === 'none' ? '#a3a3a3' : '#111' }}>
                        {reminder === 'none' ? 'No reminder' :
                            reminder === '5m' ? '5 minutes before' :
                                reminder === '10m' ? '10 minutes before' :
                                    reminder === '30m' ? '30 minutes before' : '1 hour before'}
                    </Text>
                </TouchableOpacity>
            </View>

            {meetingType === 'online' && (
                <View style={styles.fieldContainer}>
                    <SectionLabel>Link</SectionLabel>
                    <TextInput placeholder="https://meet.example.com/meeting-link" placeholderTextColor="#a3a3a3" value={link} onChangeText={setLink} style={styles.input} autoCapitalize="none" />
                </View>
            )}

            <View style={styles.fieldContainer}>
                <SectionLabel>Note</SectionLabel>
                <TextInput placeholder="Add meeting notes" placeholderTextColor="#a3a3a3" value={notes} onChangeText={setNotes} style={[styles.input, styles.notesInput]} multiline />
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
                        {participants.map(p => {
                            const user = allUsers.find(u => u.email === p.email);
                            return (
                                <View key={p.uid} style={styles.chip}>
                                    {user?.photoURL ? (
                                        <Image
                                            source={{ uri: user.photoURL }}
                                            style={styles.chipImage}
                                            height={44}
                                            width={44}
                                        />
                                    ) : (
                                        <View style={styles.chipImagePlaceholder}>
                                            <Text style={styles.chipImagePlaceholderText}>
                                                {p.name.charAt(0).toUpperCase()}
                                            </Text>
                                        </View>
                                    )}
                                </View>
                            );
                        })}
                    </View>
                )}
            </View>

            <TouchableOpacity
                disabled={!isValid || isLoading}
                onPress={handleUpdateMeeting}
                style={[styles.primaryButton, (!isValid || isLoading) && styles.primaryButtonDisabled]}
            >
                <Text style={styles.primaryButtonText}>
                    {isLoading ? 'Updating...' : 'Update Meeting'}
                </Text>
              <Text style={styles.primaryButtonText}>{isLoading ? 'Updating...' : 'Update meeting'}</Text>
            </TouchableOpacity>
            {error && <Text style={styles.errorText}>{error}</Text>}
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
                                selected: {
                                    borderRadius: 10,
                                    height: 40,
                                    width: 40,
                                    backgroundColor: '#7B21FF',
                                },
                                selected_label: { color: 'white' },
                                button_prev_image: { tintColor: '#454545' },
                                button_next_image: { tintColor: '#454545' },
                                month_selector_label: { fontSize: 18, color: '#454545' },
                                year_selector_label: { fontSize: 18, color: '#454545' },
                                day_label: { color: 'rgb(41 41 41)', fontSize: 12.5 },
                                weekday_label: { color: 'rgb(41 41 41)', fontSize: 13 },
                                outside_label: { color: 'rgb(173 173 173))', fontSize: 12.5 },
                                month_label: { fontSize: 12, color: 'rgb(173 173 173))' },
                            }}
                            style={{
                                paddingHorizontal: 12,
                                paddingVertical: 15,
                                minHeight: 320,
                            }}
                        />
                        <View
                            style={{
                                width: '100%',
                                backgroundColor: '#e5e5ea',
                                borderRadius: 0,
                                padding: 0,
                                height: 1,
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

            {/* Reminder */}
            <Modal visible={isReminderOpen} transparent animationType="fade" onRequestClose={() => setIsReminderOpen(false)}>
                <View style={styles.modalBackdrop}>
                    <View style={styles.modalCard}>
                        {(['none', '5m', '10m', '30m', '1h'] as const).map(opt => (
                            <TouchableOpacity key={opt} style={styles.listItem} onPress={() => { setReminder(opt); setIsReminderOpen(false) }}>
                                <Text style={styles.listItemLabel}>
                                    {opt === 'none' ? 'No reminder' : opt === '5m' ? '5 minutes before' : opt === '10m' ? '10 minutes before' : opt === '30m' ? '30 minutes before' : '1 hour before'}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </Modal>

            {/* Participants modal placeholder */}
            <Modal
                visible={isParticipantsOpen}
                animationType="fade"
                transparent
                onRequestClose={() => setIsParticipantsOpen(false)}
            >
                <View style={styles.modalBackdrop}>
                    <View style={styles.modalCard}>
                        <Text style={styles.modalTitle}>Select Participants</Text>
                        <ScrollView style={{ maxHeight: 300, marginTop: 10, marginBottom: 10 }}>

                            {allUsers.length === 0 ? (
                                <Text style={{ textAlign: 'center', color: '#a3a3a3' }}>
                                    No users found.
                                </Text>
                            ) : (
                                allUsers.map(user => (
                                    <TouchableOpacity
                                        key={user.uid}
                                        style={[
                                            styles.participantOption,
                                            participants.some(p => p.uid === user.uid) &&
                                            styles.selectedParticipantOption,
                                            participants.some(p => p.uid === user.uid) && {
                                                backgroundColor: '#e0e7ff',
                                                borderColor: '#4f46e5',
                                            },
                                        ]}
                                        onPress={() => {
                                            setParticipants(prev =>
                                                prev.some(p => p.uid === user.uid)
                                                    ? prev.filter(p => p.uid !== user.uid)
                                                    : [...prev, user],
                                            );
                                        }}
                                    >
                                        <Text
                                            style={[
                                                styles.participantOptionText,
                                                participants.some(p => p.uid === user.uid) && {
                                                    color: '#4f46e5',
                                                    fontWeight: '600',
                                                },
                                            ]}
                                        >
                                            {user.name} ({user.email})
                                        </Text>
                                        {participants.some(p => p.uid === user.uid) && (
                                            <MaterialIcons name="check-circle" size={20} color="#4f46e5" />
                                        )}
                                    </TouchableOpacity>
                                ))
                            )}
                        </ScrollView>
                        <TouchableOpacity
                            style={styles.modalDoneButton}
                            onPress={() => setIsParticipantsOpen(false)}
                        >
                            <Text style={styles.modalDoneButtonText}>Done</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    )
}

export default UpdateMeeting


