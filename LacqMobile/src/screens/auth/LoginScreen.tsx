// src/screens/auth/LoginScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuthStore } from '../../store/authStore';
import { Colors, Typography, Spacing, BorderRadius, Shadow } from '../../theme/tokens';

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

export const LoginScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const { login, isLoading, error, clearError } = useAuthStore();

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Uyarı', 'Lütfen tüm alanları doldurun.');
      return;
    }
    clearError();
    await login(email.trim().toLowerCase(), password);
    if (error) {
      Alert.alert('Hata', error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.brandName}>lacq</Text>
          <Text style={styles.tagline}>nail & beauty studio</Text>
        </View>

        <View style={styles.decorativeLine} />

        <View style={styles.formContainer}>
          <Text style={styles.welcomeText}>Hoş geldiniz</Text>
          <Text style={styles.subtitleText}>Hesabınıza giriş yapın</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>E-POSTA</Text>
            <TextInput
              style={[styles.input, emailFocused && styles.inputFocused]}
              value={email}
              onChangeText={setEmail}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
              placeholder="ornek@email.com"
              placeholderTextColor={Colors.textTertiary}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>ŞİFRE</Text>
            <View style={[styles.passwordContainer, passwordFocused && styles.inputFocused]}>
              <TextInput
                style={styles.passwordInput}
                value={password}
                onChangeText={setPassword}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                placeholder="••••••••"
                placeholderTextColor={Colors.textTertiary}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeButton}>
                <Text style={styles.eyeButtonText}>{showPassword ? 'GİZLE' : 'GÖSTER'}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.forgotPassword} onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotPasswordText}>Şifremi unuttum</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
            onPress={handleLogin}
            disabled={isLoading}
            activeOpacity={0.85}
          >
            {isLoading ? (
              <ActivityIndicator color={Colors.surface} size="small" />
            ) : (
              <Text style={styles.loginButtonText}>Giriş Yap</Text>
            )}
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>veya</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('RegisterScreen')} activeOpacity={0.7}>
            <Text style={styles.registerButtonText}>Hesap Oluştur</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Devam ederek{' '}
            <Text style={styles.footerLink}>Kullanım Şartları</Text>
            {' '}ve{' '}
            <Text style={styles.footerLink}>Gizlilik Politikası</Text>
            {'\'nı'} kabul etmiş olursunuz.
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scrollContent: { flexGrow: 1, paddingHorizontal: Spacing[6], paddingTop: 80, paddingBottom: 40 },
  header: { alignItems: 'center', marginBottom: Spacing[4] },
  brandName: { fontFamily: Typography.fontDisplay, fontSize: 52, color: Colors.textPrimary, letterSpacing: 6 },
  tagline: { fontFamily: Typography.fontBody, fontSize: 12, color: Colors.textSecondary, letterSpacing: 3, textTransform: 'uppercase', marginTop: -4 },
  decorativeLine: { width: 40, height: 1, backgroundColor: Colors.primary, alignSelf: 'center', marginBottom: Spacing[8] },
  formContainer: { flex: 1 },
  welcomeText: { fontFamily: Typography.fontDisplayRegular, fontSize: 32, color: Colors.textPrimary, marginBottom: Spacing[1] },
  subtitleText: { fontFamily: Typography.fontBody, fontSize: 15, color: Colors.textSecondary, marginBottom: Spacing[8] },
  inputGroup: { marginBottom: Spacing[5] },
  inputLabel: { fontFamily: Typography.fontBodyMedium, fontSize: 11, color: Colors.textSecondary, letterSpacing: 1.5, marginBottom: Spacing[2] },
  input: { height: 52, backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.border, borderRadius: BorderRadius.lg, paddingHorizontal: Spacing[4], fontFamily: Typography.fontBody, fontSize: 15, color: Colors.textPrimary, ...Shadow.sm },
  inputFocused: { borderColor: Colors.primary, borderWidth: 1.5 },
  passwordContainer: { height: 52, backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.border, borderRadius: BorderRadius.lg, flexDirection: 'row', alignItems: 'center', ...Shadow.sm },
  passwordInput: { flex: 1, paddingHorizontal: Spacing[4], fontFamily: Typography.fontBody, fontSize: 15, color: Colors.textPrimary },
  eyeButton: { paddingHorizontal: Spacing[4], paddingVertical: Spacing[3] },
  eyeButtonText: { fontFamily: Typography.fontBodyMedium, fontSize: 10, color: Colors.primary, letterSpacing: 0.5 },
  forgotPassword: { alignSelf: 'flex-end', marginTop: -Spacing[3], marginBottom: Spacing[6] },
  forgotPasswordText: { fontFamily: Typography.fontBody, fontSize: 13, color: Colors.primary },
  loginButton: { height: 54, backgroundColor: Colors.primary, borderRadius: BorderRadius.lg, justifyContent: 'center', alignItems: 'center', ...Shadow.md },
  loginButtonDisabled: { opacity: 0.7 },
  loginButtonText: { fontFamily: Typography.fontBodyMedium, fontSize: 15, color: Colors.surface, letterSpacing: 0.5 },
  divider: { flexDirection: 'row', alignItems: 'center', marginVertical: Spacing[6] },
  dividerLine: { flex: 1, height: 1, backgroundColor: Colors.border },
  dividerText: { fontFamily: Typography.fontBody, fontSize: 13, color: Colors.textTertiary, marginHorizontal: Spacing[4] },
  registerButton: { height: 54, backgroundColor: Colors.surface, borderRadius: BorderRadius.lg, borderWidth: 1, borderColor: Colors.border, justifyContent: 'center', alignItems: 'center' },
  registerButtonText: { fontFamily: Typography.fontBodyMedium, fontSize: 15, color: Colors.textPrimary, letterSpacing: 0.5 },
  footer: { marginTop: Spacing[8], alignItems: 'center' },
  footerText: { fontFamily: Typography.fontBody, fontSize: 11, color: Colors.textTertiary, textAlign: 'center', lineHeight: 16 },
  footerLink: { color: Colors.primary, textDecorationLine: 'underline' },
});