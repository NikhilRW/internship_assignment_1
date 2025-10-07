import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import DateTimePicker from 'react-native-ui-datepicker';
import { UseFormSetValue } from 'react-hook-form';
import { MeetingFormData } from '@/shared/schema/Meeting';
import { styles } from '@/shared/styles/Meeting.styles';

type DateTimeModalProps = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    watchedDate: Date | undefined;
    setValue: UseFormSetValue<MeetingFormData>;
};

const DateTimeModal = ({
    isOpen,
    setIsOpen,
    watchedDate,
    setValue,
}: DateTimeModalProps) => {
    return (
        <Modal
            visible={isOpen}
            transparent
            animationType="fade"
            onRequestClose={() => setIsOpen(false)}
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
                        date={watchedDate || new Date()}
                        onChange={({ date: selectedDate }) => {
                            if (selectedDate) {
                                const newDate = new Date(selectedDate.toString());
                                setValue('date', newDate, { shouldValidate: true });
                                setValue('time', newDate, { shouldValidate: true });
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
                                setValue('time', newDate, { shouldValidate: true });
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
                            onPress={() => setIsOpen(false)}
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
    );
};

export default DateTimeModal;