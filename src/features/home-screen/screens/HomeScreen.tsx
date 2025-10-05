import React, { useState, useEffect } from 'react'
import { FlatList, ActivityIndicator, View, Text, TouchableOpacity } from 'react-native'
import {Meeting} from 'shared/services/MeetingService'

import MeetingService  from 'shared/services/MeetingService'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from 'shared/navigation/types/common'
import { styles } from '../styles/HomeScreen.styles'
import MaterialIcons from '@react-native-vector-icons/material-icons'



const HomeScreen = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const fetchedMeetings = await MeetingService.getMeetings();
        setMeetings(fetchedMeetings)
      } catch (err) {
        setError('Failed to fetch meetings.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchMeetings()
  }, [])
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('CreateMeeting')} style={styles.cta}>
        <Text style={styles.ctaText}>Create Meeting</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : meetings.length === 0 ? (
        <Text style={styles.noMeetingsText}>No meetings found. Create one!</Text>
      ) : (
        <FlatList
          data={meetings}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.meetingItem}
              onPress={() => navigation.navigate('UpdateMeeting', { meetingId: item.id })}
            >
              <View style={styles.meetingItemContent}>
                <Text style={styles.meetingItemTitle}>{item.title}</Text>
                <Text style={styles.meetingItemDate}>
                  <MaterialIcons name="calendar-today" size={14} color="#555" />
                  {` ${new Date(item.date).toLocaleDateString()}`}
                </Text>
                <Text style={styles.meetingItemTime}>
                  <MaterialIcons name="access-time" size={14} color="#555" />
                  {` ${new Date(item.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
                </Text>
                {item.participants && item.participants.length > 0 && (
                  <Text style={styles.meetingItemParticipants}>
                    <MaterialIcons name="people" size={14} color="#555" />
                    {` ${item.participants.length} participants`}
                  </Text>
                )}
              </View>
              <MaterialIcons name="chevron-right" size={24} color="#555" />
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.meetingList}
        />
      )}
    </View>
  )
}

export default HomeScreen;