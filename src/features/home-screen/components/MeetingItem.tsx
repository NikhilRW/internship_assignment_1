import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { styles } from '../styles/HomeScreen.styles';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/shared/navigation/types/common';
import { Meeting } from '@/shared/types/Meeting';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { useAuthStore } from '@/shared/store/useAuthStore';

interface MeetingItemProps {
  item: Meeting;
  onDelete: (id: string) => void;
}

const MeetingItem = ({ item, onDelete }: MeetingItemProps) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { user } = useAuthStore();
  const isOwner = item.ownerUid === user?.uid;

  return (
    <TouchableOpacity
      style={styles.meetingItem}
      onPress={() => navigation.navigate('UpdateMeeting', { meetingId: item.id!, isOwner })}
    >
      <View style={styles.meetingItemContent}>
        <Text style={styles.meetingItemTitle}>{item.title}</Text>
        <View style={styles.meetingItemInfoContainer}>
          <Text style={styles.meetingItemDate}>
            <MaterialIcons name="calendar-today" size={14} color="#666" />
            {` ${new Date(item.dateTime).toLocaleDateString()}`}
          </Text>
          <Text style={styles.meetingItemTime}>
            <MaterialIcons name="access-time" size={14} color="#666" />
            {` ${new Date(item.dateTime).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}`}
          </Text>
        </View>
      </View>
      {isOwner && (
        <View style={styles.iconContainer}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.navigate('UpdateMeeting', { meetingId: item.id!, isOwner })}
          >
            <MaterialIcons name="edit" size={20} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => onDelete(item.id!)}
          >
            <MaterialIcons name="delete" size={20} color="#666" />
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default MeetingItem;
