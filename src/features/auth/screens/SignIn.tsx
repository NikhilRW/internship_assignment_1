import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { styles } from 'auth/styles/SignIn.styles';
import AuthService from 'auth/services/AuthService';
import { AuthStackParamList } from '@/shared/navigation/types/common';

const SignIn = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const handleGoogleSignIn = async () => {
    try {
      await AuthService.googleSignIn();
      navigation.getParent()?.navigate('HomeScreen');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome back</Text>

      <TouchableOpacity
        onPress={handleGoogleSignIn}
        activeOpacity={0.8}
        style={styles.googleButton}
      >
        <Image
          source={require('shared/res/pngs/google_logo.webp')}
          width={30}
          height={30}
          resizeMode="contain"
          style={styles.googleLogo}
        />
        <Text style={styles.googleText}>Continue with Google</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignIn;
