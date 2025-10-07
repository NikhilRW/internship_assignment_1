import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Controller } from 'react-hook-form';
import { styles } from '@/shared/styles/Meeting.styles';
import { ReminderFieldProps } from '@/shared/types/Props';

const ReminderField: React.FC<ReminderFieldProps> = ({
  control,
  setIsReminderOpen,
  error
}) => {
  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>Reminder</Text>
      <Controller
        control={control}
        name="reminder"
        render={({ field: { value } }) => (
          <>
            <TouchableOpacity
              style={[styles.input, error && styles.inputError]}
              onPress={() => setIsReminderOpen(true)}
            >
              <Text
                style={[
                  styles.inputText,
                  value === 'none' ? styles.participantsTextEmpty : styles.participantsTextSelected
                ]}
              >
                {value === 'none'
                  ? 'No reminder'
                  : value === '5m'
                    ? '5 minutes before'
                    : value === '10m'
                      ? '10 minutes before'
                      : value === '30m'
                        ? '30 minutes before'
                        : '1 hour before'}
              </Text>
            </TouchableOpacity>
            {error && (
              <Text style={styles.errorText}>{error.message}</Text>
            )}
          </>
        )}
      />
    </View>
  );
};

export default ReminderField;
