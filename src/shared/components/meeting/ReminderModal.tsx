import { styles } from '@/shared/styles/Meeting.styles';
import { ReminderModalProps } from '@/shared/types/Props';
import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';

type ReminderType = 'none' | '5m' | '10m' | '30m' | '1h';


const reminderOptions: Array<{ value: ReminderType; label: string }> = [
  { value: 'none', label: 'No reminder' },
  { value: '5m', label: '5 minutes before' },
  { value: '10m', label: '10 minutes before' },
  { value: '30m', label: '30 minutes before' },
  { value: '1h', label: '1 hour before' },
];

const ReminderModal: React.FC<ReminderModalProps> = ({
  onClose,
  onSelect,
  isOpen
}) => {
  const handleSelect = (value: ReminderType) => {
    onSelect(value);
    onClose();
  };

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalBackdrop}>
        <View style={styles.modalCard}>
          {reminderOptions.map(option => (
            <TouchableOpacity
              key={option.value}
              style={styles.listItem}
              onPress={() => handleSelect(option.value)}
            >
              <Text style={styles.listItemLabel}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
};

export default ReminderModal;