import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from 'shared/navigation/types/common';
import CreateMeeting from 'create-meeting/screens/CreateMeeting';
import UpdateMeeting from 'update-meeting/screens/UpdateMeeting';
import HomeScreen from 'home-screen/screens/HomeScreen';
import AuthStack from 'shared/navigation/routes/AuthStack';
import { useAuthStore } from 'shared/store/useAuthStore';
import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Root = () => {
  const { setUser, isAuthenticated } = useAuthStore();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), user => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [setUser]);

  return (
    <Stack.Navigator initialRouteName={isAuthenticated ? 'HomeScreen' : 'Auth'}>
      <Stack.Screen
        name="Auth"
        component={AuthStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen
        name="CreateMeeting"
        component={CreateMeeting}
        options={{ title: 'Create Meeting' }}
      />
      <Stack.Screen
        name="UpdateMeeting"
        component={UpdateMeeting}
        options={{ title: 'Update Meeting' }}
      />
    </Stack.Navigator>
  );
};

export default Root;