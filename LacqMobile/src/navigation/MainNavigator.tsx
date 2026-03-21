import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors, Typography } from '../theme/tokens';
import { MainTabParamList } from './types';
import { HomeScreen } from '../screens/main/HomeScreen';
import { DiscoverScreen } from '../screens/main/DiscoverScreen';
import { AppointmentsScreen } from '../screens/main/AppointmentsScreen';
import { ProfileScreen } from '../screens/main/ProfileScreen';
import { Home, Calendar, Search, User } from 'lucide-react-native';

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.surface,
          borderTopColor: Colors.border,
          borderTopWidth: 0.5,
          paddingBottom: 8,
          paddingTop: 8,
          height: 68,
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textTertiary,
        tabBarLabelStyle: {
          fontFamily: Typography.fontBodyMedium,
          fontSize: 10,
          marginTop: 2,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Ana Sayfa',
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} strokeWidth={1.5} />,
        }}
      />
      <Tab.Screen
        name="Appointments"
        component={AppointmentsScreen}
        options={{
          title: 'Randevularım',
          tabBarIcon: ({ color, size }) => <Calendar color={color} size={size} strokeWidth={1.5} />,
        }}
      />
      <Tab.Screen
        name="Discover"
        component={DiscoverScreen}
        options={{
          title: 'Keşfet',
          tabBarIcon: ({ color, size }) => <Search color={color} size={size} strokeWidth={1.5} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profil',
          tabBarIcon: ({ color, size }) => <User color={color} size={size} strokeWidth={1.5} />,
        }}
      />
    </Tab.Navigator>
  );
};