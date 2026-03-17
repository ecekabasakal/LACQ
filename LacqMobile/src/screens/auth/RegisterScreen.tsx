import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors, Typography, Spacing } from '../../theme/tokens';

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

export const RegisterScreen = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hesap Oluştur</Text>
      <Text style={styles.subtitle}>Yakında burada olacak</Text>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.back}>← Geri dön</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, justifyContent: 'center', alignItems: 'center' },
  title: { fontFamily: Typography.fontDisplayRegular, fontSize: 32, color: Colors.textPrimary },
  subtitle: { fontFamily: Typography.fontBody, fontSize: 15, color: Colors.textSecondary, marginTop: Spacing[2], marginBottom: Spacing[6] },
  back: { fontFamily: Typography.fontBody, fontSize: 15, color: Colors.primary },
});