import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FieldErrors } from 'react-hook-form';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { styles } from '@/shared/styles/Meeting.styles';
import { MeetingFormData } from '@/shared/schema/Meeting';

interface DateTimeFieldProps {
  setisDateTimeOpen: React.Dispatch<React.SetStateAction<boolean>>;
  watchedDate: Date;
  watchedTime: Date;
  errors: FieldErrors<MeetingFormData>;
}

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.inputLabelContainer}>
    <Text style={styles.label}>{children?.toString().replace('*', '')}</Text>
    {children?.toString().includes('*') && (
      <Text style={styles.required}>*</Text>
    )}
  </View>
);

const DateTimeField: React.FC<DateTimeFieldProps> = ({
  setisDateTimeOpen,
  watchedDate,
  watchedTime,
  errors,
}) => {
  return (
    <View style={styles.fieldContainer}>
      <SectionLabel>Date and Time*</SectionLabel>
      <TouchableOpacity
        style={styles.dateTimeField}
        onPress={() => setisDateTimeOpen(true)}
      >
        <View style={styles.dateTimeFieldTextContainer}>
          <MaterialIcons name="calendar-month" size={24} color={'#7c3aed'} />
          <Text style={styles.dateTimeFieldText}>
            {watchedDate
              ? `${watchedDate.getDate().toString().padStart(2, '0')}-${(
                  watchedDate.getMonth() + 1
                )
                  .toString()
                  .padStart(2, '0')}-${watchedDate.getFullYear()}`
              : 'Select date'}
          </Text>
        </View>
        <Text style={styles.separator}>|</Text>
        <View style={styles.dateTimeFieldTextContainer}>
          <MaterialIcons size={24} name="access-time" color={'#7c3aed'} />
          <Text style={styles.dateTimeFieldText}>
            {watchedTime
              ? watchedTime.toLocaleTimeString([], {
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true,
                })
              : 'Select time'}
          </Text>
        </View>
      </TouchableOpacity>
      {(errors.date || errors.time) && (
        <Text style={styles.errorText}>
          {errors.date?.message || errors.time?.message}
        </Text>
      )}
    </View>
  );
};

export default DateTimeField;
