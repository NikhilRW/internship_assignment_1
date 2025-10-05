import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SignIn from 'auth/screens/SignIn'
import SignUp from 'auth/screens/SignUp'

export type AuthStackParamList = {
    SignIn: undefined
    SignUp: undefined
}

const Stack = createNativeStackNavigator<AuthStackParamList>()

const AuthStack = () => {
    return (
        <Stack.Navigator initialRouteName="SignIn">
            <Stack.Screen name="SignIn" component={SignIn} options={{ title: 'Sign In', headerShown: false }} />
            <Stack.Screen name="SignUp" component={SignUp} options={{ title: 'Create Account', headerShown: false }} />
        </Stack.Navigator>
    )
}

export default AuthStack;