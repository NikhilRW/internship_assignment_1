import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import SectionLabel from './SectionLabel';
import { styles } from '@/shared/styles/Meeting.styles';
import { ParticipantsFieldProps } from '@/shared/types/Props';
import { UserType } from '@/shared/types/Meeting';

const ParticipantsField = ({
  watchedParticipants,
  allUsers,
  errors,
  setIsParticipantsOpen,
}: ParticipantsFieldProps) => {
  return (
    <View style={styles.fieldContainer}>
      <SectionLabel>Participants</SectionLabel>
      <View style={[styles.row, styles.gap12]}>
        <View style={[styles.flex1, styles.input]}>
          <Text
            style={[
              styles.participantsText,
              watchedParticipants.length ? styles.participantsTextSelected : styles.participantsTextEmpty
            ]}
          >
            {watchedParticipants.length
              ? `${watchedParticipants.length} participant${watchedParticipants.length > 1 ? 's' : ''
              }`
              : 'no participants selected'}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => setIsParticipantsOpen(true)}
          style={styles.addButton}
        >
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      {errors.participants && (
        <Text style={styles.errorText}>{errors.participants.message}</Text>
      )}
      {!!watchedParticipants.length && (
        <View
          style={[styles.row, styles.gap8, styles.participantsContainer]}
        >
          {watchedParticipants.map((p: UserType) => {
            const foundUser = allUsers.find(u => u.email === p.email);
            return (
              <View key={p.uid} style={styles.chip}>
                {foundUser?.photoURL ? (
                  <Image
                    source={{ uri: p.photoURL }}
                    style={styles.chipImage}
                    height={44}
                    width={44}
                  />
                ) : (
                  <View style={styles.chipImagePlaceholder}>
                    <Text style={styles.chipImagePlaceholderText}>
                      {p && p.name ? p.name.charAt(0).toUpperCase() : ''}
                    </Text>
                  </View>
                )}
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
};

export default ParticipantsField;
