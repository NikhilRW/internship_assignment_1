import React from 'react';
import { View, TextInput } from 'react-native';
import { Controller } from 'react-hook-form';
import  SectionLabel  from './SectionLabel';
import { styles } from '@/shared/styles/Meeting.styles';
import { NotesFieldProps } from '@/shared/types/Props';



const NotesField = ({ control }: NotesFieldProps) => {
    return (
        <View style={styles.fieldContainer}>
            <SectionLabel>Note</SectionLabel>
            <Controller
                control={control}
                name="notes"
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        placeholder="Add meeting notes"
                        placeholderTextColor="#a3a3a3"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        style={[styles.input, styles.notesInput]}
                        multiline
                    />
                )}
            />
        </View>
    );
};

export default NotesField;