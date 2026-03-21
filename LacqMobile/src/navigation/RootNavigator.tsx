import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthStore } from '../store/authStore';
import { AuthNavigator } from './AuthNavigator';
import { MainNavigator } from './MainNavigator';
import { RootStackParamList } from './types';
import { SpecialistDetailScreen } from '../screens/main/SpecialistDetailScreen';
import { AppointmentDetailScreen } from '../screens/main/AppointmentDetailScreen';
import { BookAppointmentScreen } from '../screens/main/BookAppointmentScreen';
import { OnboardingScreen } from '../screens/auth/OnboardingScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const { isAuthenticated } = useAuthStore();
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean | null>(null);

  useEffect(() => {
    const checkOnboarding = async () => {
      const seen = await AsyncStorage.getItem('hasSeenOnboarding');
      setHasSeenOnboarding(seen === 'true');
    };
    checkOnboarding();
  }, []);

  if (hasSeenOnboarding === null) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!hasSeenOnboarding ? (
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        ) : isAuthenticated ? (
          <>
            <Stack.Screen name="MainTabs" component={MainNavigator} />
            <Stack.Screen name="SpecialistDetail" component={SpecialistDetailScreen} />
            <Stack.Screen name="AppointmentDetail" component={AppointmentDetailScreen} />
            <Stack.Screen name="BookAppointment" component={BookAppointmentScreen} />
          </>
        ) : (
          <Stack.Screen name="Login" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};