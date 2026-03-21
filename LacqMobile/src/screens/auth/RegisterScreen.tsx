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
import { Colors, Typography, Spacing, BorderRadius, Shadow } from '../../theme/tokens';
import { useAuthStore } from '../../store/authStore';

type Props = {
  navigation: any;
};

export const RegisterScreen = ({ navigation }: Props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { register, isLoading, error, clearError } = useAuthStore();

  const handleRegister = async () => {
    if (!firstName || !lastName || !email || !password || !phone) {
      Alert.alert('Uyarı', 'Lütfen tüm alanları doldurun.');
      return;
    }
    clearError();
    await register({ firstName, lastName, email, password, phone });
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
          <Text style={styles.welcomeText}>Hesap Oluştur</Text>
          <Text style={styles.subtitleText}>Bilgilerinizi girin</Text>

          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: Spacing[2] }]}>
              <Text style={styles.inputLabel}>AD</Text>
              <TextInput
                style={styles.input}
                value={firstName}
                onChangeText={setFirstName}
                placeholder="Adınız"
                placeholderTextColor={Colors.textTertiary}
                autoCapitalize="words"
              />
            </View>
            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.inputLabel}>SOYAD</Text>
              <TextInput
                style={styles.input}
                value={lastName}
                onChangeText={setLastName}
                placeholder="Soyadınız"
                placeholderTextColor={Colors.textTertiary}
                autoCapitalize="words"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>E-POSTA</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="ornek@email.com"
              placeholderTextColor={Colors.textTertiary}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>TELEFON</Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder="05XX XXX XX XX"
              placeholderTextColor={Colors.textTertiary}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>ŞİFRE</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                value={password}
                onChangeText={setPassword}
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

          <TouchableOpacity
            style={[styles.registerButton, isLoading && styles.buttonDisabled]}
            onPress={handleRegister}
            disabled={isLoading}
            activeOpacity={0.85}
          >
            {isLoading ? (
              <ActivityIndicator color={Colors.surface} size="small" />
            ) : (
              <Text style={styles.registerButtonText}>Kayıt Ol</Text>
            )}
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>veya</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate('LoginScreen')}
          >
            <Text style={styles.loginButtonText}>Zaten hesabım var</Text>
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
  scrollContent: { flexGrow: 1, paddingHorizontal: Spacing[6], paddingTop: 60, paddingBottom: 40 },
  header: { alignItems: 'center', marginBottom: Spacing[4] },
  brandName: { fontFamily: Typography.fontDisplay, fontSize: 48, color: Colors.textPrimary, letterSpacing: 6 },
  tagline: { fontFamily: Typography.fontBody, fontSize: 12, color: Colors.textSecondary, letterSpacing: 3, textTransform: 'uppercase', marginTop: -4 },
  decorativeLine: { width: 40, height: 1, backgroundColor: Colors.primary, alignSelf: 'center', marginBottom: Spacing[6] },
  formContainer: { flex: 1 },
  welcomeText: { fontFamily: Typography.fontDisplayRegular, fontSize: 28, color: Colors.textPrimary, marginBottom: Spacing[1] },
  subtitleText: { fontFamily: Typography.fontBody, fontSize: 15, color: Colors.textSecondary, marginBottom: Spacing[6] },
  row: { flexDirection: 'row', marginBottom: 0 },
  inputGroup: { marginBottom: Spacing[4] },
  inputLabel: { fontFamily: Typography.fontBodyMedium, fontSize: 11, color: Colors.textSecondary, letterSpacing: 1.5, marginBottom: Spacing[2] },
  input: { height: 52, backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.border, borderRadius: BorderRadius.lg, paddingHorizontal: Spacing[4], fontFamily: Typography.fontBody, fontSize: 15, color: Colors.textPrimary, ...Shadow.sm },
  passwordContainer: { height: 52, backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.border, borderRadius: BorderRadius.lg, flexDirection: 'row', alignItems: 'center', ...Shadow.sm },
  passwordInput: { flex: 1, paddingHorizontal: Spacing[4], fontFamily: Typography.fontBody, fontSize: 15, color: Colors.textPrimary },
  eyeButton: { paddingHorizontal: Spacing[4], paddingVertical: Spacing[3] },
  eyeButtonText: { fontFamily: Typography.fontBodyMedium, fontSize: 10, color: Colors.primary, letterSpacing: 0.5 },
  registerButton: { height: 54, backgroundColor: Colors.primary, borderRadius: BorderRadius.lg, justifyContent: 'center', alignItems: 'center', ...Shadow.md },
  buttonDisabled: { opacity: 0.7 },
  registerButtonText: { fontFamily: Typography.fontBodyMedium, fontSize: 15, color: Colors.surface, letterSpacing: 0.5 },
  divider: { flexDirection: 'row', alignItems: 'center', marginVertical: Spacing[5] },
  dividerLine: { flex: 1, height: 1, backgroundColor: Colors.border },
  dividerText: { fontFamily: Typography.fontBody, fontSize: 13, color: Colors.textTertiary, marginHorizontal: Spacing[4] },
  loginButton: { height: 54, backgroundColor: Colors.surface, borderRadius: BorderRadius.lg, borderWidth: 1, borderColor: Colors.border, justifyContent: 'center', alignItems: 'center' },
  loginButtonText: { fontFamily: Typography.fontBodyMedium, fontSize: 15, color: Colors.textPrimary, letterSpacing: 0.5 },
  footer: { marginTop: Spacing[6], alignItems: 'center' },
  footerText: { fontFamily: Typography.fontBody, fontSize: 11, color: Colors.textTertiary, textAlign: 'center', lineHeight: 16 },
  footerLink: { color: Colors.primary, textDecorationLine: 'underline' },
});