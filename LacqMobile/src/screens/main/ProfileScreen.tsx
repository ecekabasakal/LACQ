import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Colors, Typography, Spacing, BorderRadius, Shadow } from '../../theme/tokens';
import { useAuthStore } from '../../store/authStore';

const PAST_APPOINTMENTS = [
  { id: '1', service: 'Kalıcı Manikür', specialist: 'Ayşe Kaya', date: '15 Mar 2026', status: 'completed' },
  { id: '2', service: 'Nail Art', specialist: 'Ayşe Kaya', date: '21 Mar 2026', status: 'upcoming' },
];

const SETTINGS = [
  { id: '1', icon: '🔔', label: 'Bildirimler' },
  { id: '2', icon: '🔒', label: 'Gizlilik' },
  { id: '3', icon: '❓', label: 'Yardım' },
];

export const ProfileScreen = () => {
  const { user, logout } = useAuthStore();

  const initials = user?.firstName && user?.lastName
    ? `${user.firstName[0]}${user.lastName[0]}`
    : 'EK';

  const fullName = user?.firstName && user?.lastName
    ? `${user.firstName} ${user.lastName}`
    : 'Ece Kabasakal';

  const handleLogout = () => {
    Alert.alert(
      'Çıkış Yap',
      'Hesabınızdan çıkış yapmak istediğinize emin misiniz?',
      [
        { text: 'İptal', style: 'cancel' },
        { text: 'Çıkış Yap', style: 'destructive', onPress: () => logout() },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

        {/* Profil Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{fullName}</Text>
            <Text style={styles.email}>{user?.email || 'ece@lacq.com'}</Text>
            <View style={styles.roleBadge}>
              <Text style={styles.roleText}>Müşteri</Text>
            </View>
          </View>
        </View>

        {/* Randevu Geçmişi */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>RANDEVU GEÇMİŞİ</Text>
          {PAST_APPOINTMENTS.map((apt) => (
            <View key={apt.id} style={styles.appointmentCard}>
              <View style={styles.appointmentInfo}>
                <Text style={styles.appointmentService}>{apt.service}</Text>
                <Text style={styles.appointmentMeta}>{apt.specialist} · {apt.date}</Text>
              </View>
              <View style={[
                styles.statusBadge,
                apt.status === 'completed' ? styles.statusCompleted : styles.statusUpcoming,
              ]}>
                <Text style={[
                  styles.statusText,
                  apt.status === 'completed' ? styles.statusTextCompleted : styles.statusTextUpcoming,
                ]}>
                  {apt.status === 'completed' ? 'Tamamlandı' : 'Yaklaşan'}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Ayarlar */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>AYARLAR</Text>
          <View style={styles.settingsCard}>
            {SETTINGS.map((setting, index) => (
              <TouchableOpacity
                key={setting.id}
                style={[styles.settingRow, index < SETTINGS.length - 1 && styles.settingRowBorder]}
              >
                <Text style={styles.settingIcon}>{setting.icon}</Text>
                <Text style={styles.settingLabel}>{setting.label}</Text>
                <Text style={styles.settingArrow}>›</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Çıkış Yap */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Çıkış Yap</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
  },

  // Profil Header
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[4],
    backgroundColor: Colors.surface,
    padding: Spacing[5],
    paddingTop: Spacing[6],
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.border,
  },
  avatarCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.surfaceWarm,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.border,
  },
  avatarText: {
    fontFamily: Typography.fontBodyMedium,
    fontSize: 24,
    color: Colors.primary,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontFamily: Typography.fontBodyMedium,
    fontSize: 20,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  email: {
    fontFamily: Typography.fontBody,
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: Spacing[2],
  },
  roleBadge: {
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing[3],
    paddingVertical: 3,
    alignSelf: 'flex-start',
    borderWidth: 0.5,
    borderColor: Colors.border,
  },
  roleText: {
    fontFamily: Typography.fontBodyMedium,
    fontSize: 11,
    color: Colors.primary,
  },

  // Section
  section: {
    paddingHorizontal: Spacing[5],
    paddingTop: Spacing[5],
  },
  sectionTitle: {
    fontFamily: Typography.fontBodyMedium,
    fontSize: 11,
    color: Colors.textTertiary,
    letterSpacing: 1.5,
    marginBottom: Spacing[3],
  },

  // Randevu
  appointmentCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing[4],
    borderWidth: 0.5,
    borderColor: Colors.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing[2],
    ...Shadow.sm,
  },
  appointmentInfo: {
    flex: 1,
  },
  appointmentService: {
    fontFamily: Typography.fontBodyMedium,
    fontSize: 14,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  appointmentMeta: {
    fontFamily: Typography.fontBody,
    fontSize: 12,
    color: Colors.textSecondary,
  },
  statusBadge: {
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing[2],
    paddingVertical: 3,
  },
  statusCompleted: {
    backgroundColor: '#eaf3de',
  },
  statusUpcoming: {
    backgroundColor: '#faeeda',
  },
  statusText: {
    fontFamily: Typography.fontBody,
    fontSize: 11,
  },
  statusTextCompleted: {
    color: '#3b6d11',
  },
  statusTextUpcoming: {
    color: '#854f0b',
  },

  // Ayarlar
  settingsCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    borderWidth: 0.5,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing[4],
    gap: Spacing[3],
  },
  settingRowBorder: {
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.border,
  },
  settingIcon: {
    fontSize: 16,
  },
  settingLabel: {
    fontFamily: Typography.fontBody,
    fontSize: 14,
    color: Colors.textPrimary,
    flex: 1,
  },
  settingArrow: {
    fontFamily: Typography.fontBody,
    fontSize: 18,
    color: Colors.textTertiary,
  },

  // Çıkış
  logoutButton: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing[4],
    borderWidth: 0.5,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  logoutText: {
    fontFamily: Typography.fontBodyMedium,
    fontSize: 14,
    color: '#c9504a',
  },
});