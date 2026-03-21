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

type Props = {
  navigation: any;
  route: any;
};

export const AppointmentDetailScreen = ({ navigation, route }: Props) => {
  const appointment = route.params?.appointment;

  if (!appointment) {
    return (
      <SafeAreaView style={styles.safe}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>← Geri</Text>
        </TouchableOpacity>
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>Randevu bulunamadı.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming': return { bg: '#faeeda', text: '#854f0b', label: 'Yaklaşan' };
      case 'completed': return { bg: '#eaf3de', text: '#3b6d11', label: 'Tamamlandı' };
      case 'cancelled': return { bg: '#fcebeb', text: '#a32d2d', label: 'İptal Edildi' };
      default: return { bg: '#faeeda', text: '#854f0b', label: 'Yaklaşan' };
    }
  };

  const badge = getStatusBadge(appointment.status);

  const handleCancel = () => {
    Alert.alert(
      'Randevu İptal',
      `${appointment.service} randevunuzu iptal etmek istediğinize emin misiniz?`,
      [
        { text: 'Vazgeç', style: 'cancel' },
        { text: 'İptal Et', style: 'destructive', onPress: () => navigation.goBack() },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>← Geri</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Randevu Detayı</Text>
        </View>

        <View style={styles.statusContainer}>
          <View style={[styles.statusBadge, { backgroundColor: badge.bg }]}>
            <Text style={[styles.statusText, { color: badge.text }]}>● {badge.label}</Text>
          </View>
        </View>

        <View style={styles.content}>

          <View style={styles.card}>
            <Text style={styles.cardLabel}>HİZMET BİLGİLERİ</Text>
            <Text style={styles.serviceName}>{appointment.service || '-'}</Text>
            <Text style={styles.serviceDuration}>{appointment.duration || '-'}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardLabel}>UZMAN</Text>
            <View style={styles.specialistRow}>
              <View style={styles.specialistAvatar}>
                <Text style={styles.specialistEmoji}>👩</Text>
              </View>
              <View>
                <Text style={styles.specialistName}>{appointment.specialist || '-'}</Text>
                <Text style={styles.specialistTitle}>{appointment.specialistTitle || '-'}</Text>
              </View>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardLabel}>RANDEVU BİLGİLERİ</Text>
            <View style={styles.infoGrid}>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>TARİH</Text>
                <Text style={styles.infoValue}>{appointment.date || '-'}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>SAAT</Text>
                <Text style={styles.infoValue}>{appointment.time || '-'}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>SÜRE</Text>
                <Text style={styles.infoValue}>{appointment.duration || '-'}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>FİYAT</Text>
                <Text style={[styles.infoValue, styles.priceValue]}>{appointment.price || '-'}</Text>
              </View>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardLabel}>NOTLAR</Text>
            <Text style={styles.notesText}>
              {appointment.notes || 'Özel bir not bulunmuyor.'}
            </Text>
          </View>

          {appointment.status === 'upcoming' && (
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
              <Text style={styles.cancelText}>Randevuyu İptal Et</Text>
            </TouchableOpacity>
          )}

        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1 },
  emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontFamily: Typography.fontBody, fontSize: 15, color: Colors.textSecondary },
  header: { flexDirection: 'row', alignItems: 'center', gap: Spacing[3], paddingHorizontal: Spacing[5], paddingTop: Spacing[6], paddingBottom: Spacing[4], backgroundColor: Colors.surface, borderBottomWidth: 0.5, borderBottomColor: Colors.border },
  backButton: { backgroundColor: Colors.background, borderRadius: BorderRadius.md, paddingHorizontal: Spacing[3], paddingVertical: Spacing[2], borderWidth: 0.5, borderColor: Colors.border },
  backText: { fontFamily: Typography.fontBody, fontSize: 12, color: Colors.primary },
  headerTitle: { fontFamily: Typography.fontBodyMedium, fontSize: 18, color: Colors.textPrimary },
  statusContainer: { paddingHorizontal: Spacing[5], paddingVertical: Spacing[4], backgroundColor: Colors.surface, borderBottomWidth: 0.5, borderBottomColor: Colors.border },
  statusBadge: { borderRadius: BorderRadius.md, paddingHorizontal: Spacing[3], paddingVertical: Spacing[2], alignSelf: 'flex-start' },
  statusText: { fontFamily: Typography.fontBodyMedium, fontSize: 12 },
  content: { padding: Spacing[4], gap: Spacing[3] },
  card: { backgroundColor: Colors.surface, borderRadius: BorderRadius.xl, padding: Spacing[4], borderWidth: 0.5, borderColor: Colors.border, ...Shadow.sm },
  cardLabel: { fontFamily: Typography.fontBodyMedium, fontSize: 10, color: Colors.textTertiary, letterSpacing: 1.5, marginBottom: Spacing[3] },
  serviceName: { fontFamily: Typography.fontBodyMedium, fontSize: 20, color: Colors.textPrimary, marginBottom: 4 },
  serviceDuration: { fontFamily: Typography.fontBody, fontSize: 13, color: Colors.textSecondary },
  specialistRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing[3] },
  specialistAvatar: { width: 48, height: 48, borderRadius: BorderRadius.lg, backgroundColor: Colors.surfaceWarm, justifyContent: 'center', alignItems: 'center' },
  specialistEmoji: { fontSize: 22 },
  specialistName: { fontFamily: Typography.fontBodyMedium, fontSize: 15, color: Colors.textPrimary, marginBottom: 2 },
  specialistTitle: { fontFamily: Typography.fontBody, fontSize: 12, color: Colors.textSecondary },
  infoGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing[4] },
  infoItem: { width: '45%' },
  infoLabel: { fontFamily: Typography.fontBodyMedium, fontSize: 10, color: Colors.textTertiary, letterSpacing: 0.5, marginBottom: 4 },
  infoValue: { fontFamily: Typography.fontBodyMedium, fontSize: 14, color: Colors.textPrimary },
  priceValue: { color: Colors.primary },
  notesText: { fontFamily: Typography.fontBody, fontSize: 13, color: Colors.textSecondary, lineHeight: 20 },
  cancelButton: { backgroundColor: '#fef0ef', borderRadius: BorderRadius.lg, padding: Spacing[4], borderWidth: 0.5, borderColor: '#f5c4c4', alignItems: 'center' },
  cancelText: { fontFamily: Typography.fontBodyMedium, fontSize: 14, color: '#c9504a' },
});