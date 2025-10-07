import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import DateTimePicker from 'react-native-ui-datepicker';
import { styles } from '@/shared/styles/Meeting.styles';
import { WeekdayComponent } from './WeekDay';
import { DateTimeModalProps } from '@/shared/types/Props';

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
          <View style={styles.datePickerHeader}>
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
              Weekday: WeekdayComponent,
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
            style={styles.dateTimePickerContainer}
          />
          <View style={styles.datePickerSeparator} />
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
            style={styles.timePickerContainer}
          />
          <View
            style={[styles.row, styles.modalActions, styles.datePickerFooter]}
          >
            <TouchableOpacity
              onPress={() => setIsOpen(false)}
              style={styles.datePickerDoneButton}
            >
              <Text style={styles.datePickerDoneButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DateTimeModal;
