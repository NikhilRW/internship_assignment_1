import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { styles } from '../styles/SignUp.styles';
import UserService from '../services/UserService';
import { AuthStackParamList } from '@/shared/navigation/types/common';
import { FormValues, schema } from '@/shared/schema/Auth';

const SignUp = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    // In a real app, you'd get uid from auth provider
    const uid = Math.random().toString(36).slice(2);
    await UserService.createUser({ uid, name: data.name, email: data.email });
    navigation.getParent()?.navigate('HomeScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create your account</Text>

      <TouchableOpacity activeOpacity={0.8} style={styles.googleButton}>
        <Text style={styles.googleText}>Continue with Google</Text>
      </TouchableOpacity>

      <Text style={styles.dividerText}>or sign up with email</Text>

      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>Full name</Text>
        <TextInput
          {...register('name')}
          placeholder="Jane Doe"
          placeholderTextColor="#a3a3a3"
          onChangeText={t => setValue('name', t, { shouldValidate: true })}
          style={styles.input}
        />
        {!!errors.name && (
          <Text style={styles.errorText}>{errors.name.message}</Text>
        )}
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>Email</Text>
        <TextInput
          {...register('email')}
          placeholder="you@example.com"
          placeholderTextColor="#a3a3a3"
          onChangeText={t => setValue('email', t, { shouldValidate: true })}
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.input}
        />
        {!!errors.email && (
          <Text style={styles.errorText}>{errors.email.message}</Text>
        )}
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>Password</Text>
        <TextInput
          {...register('password')}
          placeholder="********"
          placeholderTextColor="#a3a3a3"
          onChangeText={t => setValue('password', t, { shouldValidate: true })}
          secureTextEntry
          style={styles.input}
        />
        {!!errors.password && (
          <Text style={styles.errorText}>{errors.password.message}</Text>
        )}
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>Confirm Password</Text>
        <TextInput
          {...register('confirmPassword')}
          placeholder="********"
          placeholderTextColor="#a3a3a3"
          onChangeText={t =>
            setValue('confirmPassword', t, { shouldValidate: true })
          }
          secureTextEntry
          style={styles.input}
        />
        {!!errors.confirmPassword && (
          <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>
        )}
      </View>

      <TouchableOpacity
        disabled={isSubmitting}
        onPress={handleSubmit(onSubmit)}
        style={styles.submitButton}
      >
        <Text style={styles.submitText}>Create Account</Text>
      </TouchableOpacity>

      <View style={styles.footerRow}>
        <Text style={styles.footerMuted}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.footerLink}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUp;
