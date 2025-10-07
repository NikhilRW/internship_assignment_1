import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Controller, Control } from 'react-hook-form';
import { styles } from '@/shared/styles/Meeting.styles';
import Toggle from './Toggle';
import SectionLabel from './SectionLabel';

interface MeetingTypeFieldProps {
  control: Control<any>;
}

const MeetingTypeField: React.FC<MeetingTypeFieldProps> = ({ control }) => {
  return (
    <View style={styles.fieldContainer}>
      <SectionLabel>Meeting type*</SectionLabel>
      <Controller
        control={control}
        name="meetingType"
        render={({ field: { onChange, value } }) => (
          <Toggle value={value} onChange={onChange} />
        )}
      />
    </View>
  );
};

export default MeetingTypeField;
