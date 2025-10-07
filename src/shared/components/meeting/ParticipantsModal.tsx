import React from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { UseFormSetValue } from 'react-hook-form';
import { MeetingFormData } from '@/shared/schema/Meeting';
import { UserType } from '@/shared/types/Meeting';
import { styles } from '@/shared/styles/Meeting.styles';

type ParticipantsModalProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  setValue: UseFormSetValue<MeetingFormData>;
  allUsers: UserType[];
  watchedParticipants: UserType[];
};

const ParticipantsModal = ({
  isOpen,
  setIsOpen,
  setValue,
  allUsers,
  watchedParticipants,
}: ParticipantsModalProps) => {
  return (
    <Modal
      visible={isOpen}
      animationType="fade"
      transparent
      onRequestClose={() => setIsOpen(false)}
    >
      <View style={styles.modalBackdrop}>
        <View style={styles.modalCard}>
          <Text style={styles.modalTitle}>Select Participants</Text>
          <ScrollView style={styles.participantsScrollView}>
            {allUsers.length === 0 ? (
              <Text style={styles.noUsersText}>No users found.</Text>
            ) : (
              allUsers.map(currentUser => (
                <TouchableOpacity
                  key={currentUser.uid}
                  style={[
                    styles.participantOption,
                    watchedParticipants.some(p => p.uid === currentUser.uid) &&
                      styles.selectedParticipantOption,
                  ]}
                  onPress={() => {
                    const isSelected = watchedParticipants.some(
                      p => p.uid === currentUser.uid,
                    );
                    const newParticipants = isSelected
                      ? watchedParticipants.filter(
                          p => p.uid !== currentUser.uid,
                        )
                      : [...watchedParticipants, currentUser];
                    setValue('participants', newParticipants, {
                      shouldValidate: true,
                    });
                  }}
                >
                  <Text
                    style={[
                      styles.participantOptionText,
                      watchedParticipants.some(
                        p => p.uid === currentUser.uid,
                      ) && styles.selectedParticipantOptionText,
                    ]}
                  >
                    {currentUser.name} ({currentUser.email})
                  </Text>
                  {watchedParticipants.some(p => p.uid === currentUser.uid) && (
                    <MaterialIcons
                      name="check-circle"
                      size={20}
                      color="#4f46e5"
                    />
                  )}
                </TouchableOpacity>
              ))
            )}
          </ScrollView>
          <TouchableOpacity
            style={styles.modalDoneButton}
            onPress={() => setIsOpen(false)}
          >
            <Text style={styles.modalDoneButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ParticipantsModal;
