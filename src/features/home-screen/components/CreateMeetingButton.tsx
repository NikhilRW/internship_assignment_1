import {Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { RootStackParamList } from '@/shared/navigation/types/common';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { styles } from 'home-screen/styles/HomeScreen.styles';

const CreateMeetingButton = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('CreateMeeting')}
      style={styles.cta}
    >
      <Text style={styles.ctaText}>Create Meeting</Text>
    </TouchableOpacity>
  );
};

export default CreateMeetingButton;
