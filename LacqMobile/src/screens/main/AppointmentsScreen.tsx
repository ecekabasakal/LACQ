import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
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

type AppointmentStatus = 'upcoming' | 'completed' | 'cancelled';

interface Appointment {
  id: string;
  service: string;
  specialist: string;
  specialistTitle: string;
  date: string;
  time: string;
  duration: string;
  price: string;
  status: AppointmentStatus;
  notes: string;
}

const INITIAL_APPOINTMENTS: Appointment[] = [
  { id: '1', service: 'Kalıcı Manikür', specialist: 'Ayşe Kaya', specialistTitle: 'Nail Art Uzmanı', date: '21 Mar 2026', time: '14:00', duration: '60 dk', price: '450₺', status: 'upcoming', notes: '' },
  { id: '2', service: 'Nail Art', specialist: 'Ayşe Kaya', specialistTitle: 'Nail Art Uzmanı', date: '28 Mar 2026', time: '11:00', duration: '90 dk', price: '600₺', status: 'upcoming', notes: '' },
  { id: '3', service: 'Pedikür', specialist: 'Selin Arslan', specialistTitle: 'Pedikür Uzmanı', date: '15 Mar 2026', time: '10:00', duration: '45 dk', price: '350₺', status: 'completed', notes: '' },
  { id: '4', service: 'Manikür', specialist: 'Merve Demir', specialistTitle: 'Kalıcı Uzmanı', date: '1 Mar 2026', time: '13:00', duration: '45 dk', price: '300₺', status: 'cancelled', notes: '' },
];

type TabType = 'upcoming' | 'past';

export const AppointmentsScreen = () => {
  const [activeTab, setActiveTab] = useState<TabType>('upcoming');
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const navigation = useNavigation<any>();

  const filteredAppointments = appointments.filter(apt => {
    if (activeTab === 'upcoming') return apt.status === 'upcoming';
    return apt.status === 'completed' || apt.status === 'cancelled';
  });

  const handleCancel = (apt: Appointment) => {
    Alert.alert(
      'Randevu İptal',
      `${apt.service} randevunuzu iptal etmek istediğinize emin misiniz?`,
      [
        { text: 'Vazgeç', style: 'cancel' },
        {
          text: 'İptal Et',
          style: 'destructive',
          onPress: () => {
            setAppointments(prev =>
              prev.map(a => a.id === apt.id ? { ...a, status: 'cancelled' as AppointmentStatus } : a)
            );
          },
        },
      ]
    );
  };

  const getStatusBadge = (status: AppointmentStatus) => {
    switch (status) {
      case 'upcoming': return { bg: '#faeeda', text: '#854f0b', label: 'Yaklaşan' };
      case 'completed': return { bg: '#eaf3de', text: '#3b6d11', label: 'Tamamlandı' };
      case 'cancelled': return { bg: '#fcebeb', text: '#a32d2d', label: 'İptal Edildi' };
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

        <View style={styles.header}>
          <Text style={styles.headerTitle}>Randevularım</Text>
          <View style={styles.tabs}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'upcoming' && styles.tabActive]}
              onPress={() => setActiveTab('upcoming')}
            >
              <Text style={[styles.tabText, activeTab === 'upcoming' && styles.tabTextActive]}>
                Yaklaşan
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'past' && styles.tabActive]}
              onPress={() => setActiveTab('past')}
            >
              <Text style={[styles.tabText, activeTab === 'past' && styles.tabTextActive]}>
                Geçmiş
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.list}>
          {filteredAppointments.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>📅</Text>
              <Text style={styles.emptyTitle}>
                {activeTab === 'upcoming' ? 'Yaklaşan randevunuz yok' : 'Geçmiş randevunuz yok'}
              </Text>
              <Text style={styles.emptySubtitle}>
                {activeTab === 'upcoming' ? 'Uzmanlarımızdan birinden randevu alın' : 'Tamamlanan randevularınız burada görünecek'}
              </Text>
            </View>
          ) : (
            filteredAppointments.map((apt) => {
              const badge = getStatusBadge(apt.status);
              return (
                <View key={apt.id} style={styles.appointmentCard}>
                  <View style={styles.cardHeader}>
                    <View>
                      <Text style={styles.serviceName}>{apt.service}</Text>
                      <Text style={styles.specialistName}>{apt.specialist}</Text>
                    </View>
                    <View style={[styles.statusBadge, { backgroundColor: badge.bg }]}>
                      <Text style={[styles.statusText, { color: badge.text }]}>{badge.label}</Text>
                    </View>
                  </View>

                  <View style={styles.detailRow}>
                    <View style={styles.detailItem}>
                      <Text style={styles.detailLabel}>TARİH</Text>
                      <Text style={styles.detailValue}>{apt.date}</Text>
                    </View>
                    <View style={styles.detailItem}>
                      <Text style={styles.detailLabel}>SAAT</Text>
                      <Text style={styles.detailValue}>{apt.time}</Text>
                    </View>
                    <View style={styles.detailItem}>
                      <Text style={styles.detailLabel}>SÜRE</Text>
                      <Text style={styles.detailValue}>{apt.duration}</Text>
                    </View>
                  </View>

                  {apt.status === 'upcoming' && (
                    <View style={styles.buttonRow}>
                      <TouchableOpacity
                        style={styles.detailButton}
                        onPress={() => navigation.navigate('AppointmentDetail', { appointment: apt })}
                      >
                        <Text style={styles.detailButtonText}>Detay</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.cancelButton}
                        onPress={() => handleCancel(apt)}
                      >
                        <Text style={styles.cancelButtonText}>İptal Et</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              );
            })
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
  header: { paddingHorizontal: Spacing[5], paddingTop: Spacing[6], paddingBottom: Spacing[4] },
  headerTitle: { fontFamily: Typography.fontDisplayRegular, fontSize: 32, color: Colors.textPrimary, marginBottom: Spacing[4] },
  tabs: { flexDirection: 'row', gap: Spacing[2] },
  tab: { backgroundColor: Colors.surface, borderRadius: BorderRadius.full, paddingHorizontal: Spacing[4], paddingVertical: Spacing[2], borderWidth: 0.5, borderColor: Colors.border },
  tabActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  tabText: { fontFamily: Typography.fontBody, fontSize: 13, color: Colors.textPrimary },
  tabTextActive: { color: Colors.surface },
  list: { paddingHorizontal: Spacing[4] },
  emptyState: { alignItems: 'center', paddingTop: Spacing[16] },
  emptyIcon: { fontSize: 48, marginBottom: Spacing[4] },
  emptyTitle: { fontFamily: Typography.fontBodyMedium, fontSize: 17, color: Colors.textPrimary, marginBottom: Spacing[2], textAlign: 'center' },
  emptySubtitle: { fontFamily: Typography.fontBody, fontSize: 14, color: Colors.textSecondary, textAlign: 'center', paddingHorizontal: Spacing[6] },
  appointmentCard: { backgroundColor: Colors.surface, borderRadius: BorderRadius.xl, padding: Spacing[4], borderWidth: 0.5, borderColor: Colors.border, marginBottom: Spacing[3], ...Shadow.sm },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: Spacing[3] },
  serviceName: { fontFamily: Typography.fontBodyMedium, fontSize: 16, color: Colors.textPrimary, marginBottom: 2 },
  specialistName: { fontFamily: Typography.fontBody, fontSize: 13, color: Colors.textSecondary },
  statusBadge: { borderRadius: BorderRadius.md, paddingHorizontal: Spacing[2], paddingVertical: 4 },
  statusText: { fontFamily: Typography.fontBody, fontSize: 11 },
  detailRow: { backgroundColor: Colors.background, borderRadius: BorderRadius.lg, padding: Spacing[3], flexDirection: 'row', gap: Spacing[4], marginBottom: Spacing[3] },
  detailItem: {},
  detailLabel: { fontFamily: Typography.fontBodyMedium, fontSize: 10, color: Colors.textTertiary, letterSpacing: 0.5, marginBottom: 2 },
  detailValue: { fontFamily: Typography.fontBodyMedium, fontSize: 13, color: Colors.textPrimary },
  buttonRow: { flexDirection: 'row', gap: Spacing[2] },
  detailButton: { flex: 1, backgroundColor: Colors.background, borderRadius: BorderRadius.lg, padding: Spacing[3], borderWidth: 0.5, borderColor: Colors.border, alignItems: 'center' },
  detailButtonText: { fontFamily: Typography.fontBodyMedium, fontSize: 13, color: Colors.textSecondary },
  cancelButton: { flex: 1, backgroundColor: '#fef0ef', borderRadius: BorderRadius.lg, padding: Spacing[3], borderWidth: 0.5, borderColor: '#f5c4c4', alignItems: 'center' },
  cancelButtonText: { fontFamily: Typography.fontBodyMedium, fontSize: 13, color: '#c9504a' },
});