import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Controller } from 'react-hook-form';
import { styles } from '@/shared/styles/Meeting.styles';
import SectionLabel from './SectionLabel';
import { LinkFieldProps } from '@/shared/types/Props';
styles;

const LinkField = ({ control, errors }: LinkFieldProps) => {
  return (
    <View style={styles.fieldContainer}>
      <SectionLabel>Link*</SectionLabel>
      <Controller
        control={control}
        name="link"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="https://meet.example.com/meeting-link"
            placeholderTextColor="#a3a3a3"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            style={styles.input}
            autoCapitalize="none"
          />
        )}
      />
      {errors.link && (
        <Text style={styles.errorText}>{errors.link.message}</Text>
      )}
    </View>
  );
};

export default LinkField;
