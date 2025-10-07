import React, { useState, useEffect, useCallback } from 'react';
import {
  FlatList,
  ActivityIndicator,
  View,
  Text,
  Alert,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import MeetingService from 'shared/services/MeetingService';
import { styles } from 'home-screen/styles/HomeScreen.styles';
import { Meeting } from '@/shared/types/Meeting';
import MeetingItem from 'home-screen/components/MeetingItem';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import { RootStackParamList } from '@/shared/navigation/types/common';
import { useAuthStore } from '@/shared/store/useAuthStore';

const HomeScreen = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const isFocused = useIsFocused();
  const { user } = useAuthStore();

  const fetchMeetings = useCallback(async () => {
    try {
      const fetchedMeetings = await MeetingService.getMeetings();
      // Filter meetings where user is owner or participant
      const userMeetings = fetchedMeetings.filter(
        meeting =>
          meeting.ownerUid === user?.uid ||
          (meeting.participants &&
            meeting.participants.includes(user?.uid || '')),
      );
      setMeetings(userMeetings);
      setError(null);
    } catch (err) {
      setError('Failed to fetch meetings.');
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [user?.uid]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    fetchMeetings();
  }, [fetchMeetings]);

  const handleDeleteMeeting = useCallback(
    (meetingId: string, title: string) => {
      const meeting = meetings.find(m => m.id === meetingId);
      if (!meeting || meeting.ownerUid !== user?.uid) {
        return;
      }

      Alert.alert(
        'Delete Meeting',
        `Are you sure you want to delete "${title}"?`,
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: async () => {
              try {
                await MeetingService.deleteMeeting(meetingId);
                setMeetings(prevMeetings =>
                  prevMeetings.filter(meet => meet.id !== meetingId),
                );
              } catch (err) {
                Alert.alert('Error', 'Failed to delete meeting');
                console.error(err);
              }
            },
          },
        ],
      );
    },
    [meetings, user],
  );

  useEffect(() => {
    if (isFocused) {
      fetchMeetings();
    }
  }, [isFocused, fetchMeetings]);
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Meetings</Text>
      {loading && !refreshing ? (
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color="#7c3aed" />
        </View>
      ) : error ? (
        <View style={styles.centerContent}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : meetings.length === 0 ? (
        <View style={styles.centerContent}>
          <Text style={styles.noMeetingsText}>
            {user
              ? "No meetings found. You'll see meetings here when you create one or are invited to participate."
              : 'Please sign in to see your meetings.'}
          </Text>
        </View>
      ) : (
        <FlatList
          data={meetings}
          keyExtractor={item => item.id!}
          renderItem={({ item }) => (
            <MeetingItem
              item={item}
              onDelete={() => handleDeleteMeeting(item.id!, item.title)}
            />
          )}
          contentContainerStyle={styles.meetingList}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={['#7c3aed']}
              tintColor="#7c3aed"
            />
          }
        />
      )}
      {user && (
        <TouchableOpacity
          style={styles.fab}
          onPress={() => navigation.navigate('CreateMeeting')}
        >
          <MaterialIcons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default HomeScreen;
