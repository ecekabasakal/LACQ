import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors, Typography } from '../theme/tokens';
import { MainTabParamList } from './types';
import { View, Text } from 'react-native';

const Tab = createBottomTabNavigator<MainTabParamList>();

const PlaceholderScreen = (name: string) => () => (
  <View style={{ flex: 1, backgroundColor: Colors.background, justifyContent: 'center', alignItems: 'center' }}>
    <Text style={{ fontFamily: Typography.fontBody, color: Colors.textPrimary }}>{name}</Text>
  </View>
);

export const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.surface,
          borderTopColor: Colors.border,
          paddingBottom: 8,
          paddingTop: 8,
          height: 68,
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textTertiary,
        tabBarLabelStyle: {
          fontFamily: Typography.fontBodyMedium,
          fontSize: 11,
        },
      }}
    >
      <Tab.Screen name="Home" component={PlaceholderScreen('Ana Sayfa')} options={{ title: 'Ana Sayfa' }} />
      <Tab.Screen name="Appointments" component={PlaceholderScreen('Randevularım')} options={{ title: 'Randevularım' }} />
      <Tab.Screen name="Discover" component={PlaceholderScreen('Keşfet')} options={{ title: 'Keşfet' }} />
      <Tab.Screen name="Profile" component={PlaceholderScreen('Profil')} options={{ title: 'Profil' }} />
    </Tab.Navigator>
  );
};