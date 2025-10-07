import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { styles } from '@/shared/styles/Meeting.styles';
import SectionLabel from './SectionLabel';
import { MeetingFormData } from '@/shared/schema/Meeting';

interface MeetingTitleInputProps {
  control: Control<MeetingFormData>;
  titleError: FieldErrors<MeetingFormData>['title'];
}

const MeetingTitleInput: React.FC<MeetingTitleInputProps> = ({
  control,
  titleError,
}) => {
  return (
    <View style={styles.fieldContainer}>
      <SectionLabel>Meeting Title*</SectionLabel>
      <Controller
        control={control}
        name="title"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Enter meeting title"
            placeholderTextColor="#a3a3a3"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            style={styles.input}
          />
        )}
      />
      {titleError && (
        <Text style={styles.errorText}>{titleError.message as string}</Text>
      )}
    </View>
  );
};

export default MeetingTitleInput;
