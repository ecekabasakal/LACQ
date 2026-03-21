import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, BorderRadius, Shadow } from '../../theme/tokens';

type Props = {
  navigation: any;
  route: any;
};

const SPECIALISTS_DATA = [
  { id: '1', name: 'Ayşe Kaya', title: 'Nail Art Uzmanı', experience: '5 yıl deneyim', rating: '4.9', reviews: '128' },
  { id: '2', name: 'Merve Demir', title: 'Kalıcı Uzmanı', experience: '3 yıl deneyim', rating: '4.8', reviews: '94' },
  { id: '3', name: 'Selin Arslan', title: 'Pedikür Uzmanı', experience: '4 yıl deneyim', rating: '4.7', reviews: '76' },
];

const SERVICES = [
  { id: '1', name: 'Kalıcı Manikür', duration: '60 dk', price: '450₺' },
  { id: '2', name: 'Nail Art', duration: '90 dk', price: '600₺' },
  { id: '3', name: 'Manikür', duration: '45 dk', price: '300₺' },
];

const PORTFOLIO = ['💅', '🌸', '✨', '🎨', '💅', '🌸'];

export const SpecialistDetailScreen = (props: Props) => {
  const { navigation } = props;
  const nav = useNavigation<any>();
  const specialistId = props.route?.params?.specialistId || '1';
  const specialist = SPECIALISTS_DATA.find(s => s.id === specialistId) || SPECIALISTS_DATA[0];
  const [selectedService, setSelectedService] = useState<string | null>(null);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>← Geri</Text>
        </TouchableOpacity>

        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarEmoji}>👩</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{specialist.name}</Text>
            <Text style={styles.title}>{specialist.title} · {specialist.experience}</Text>
            <View style={styles.ratingRow}>
              <Text style={styles.rating}>⭐ {specialist.rating}</Text>
              <Text style={styles.reviews}>{specialist.reviews} değerlendirme</Text>
            </View>
          </View>
        </View>

        <Text style={styles.bio}>
          Nail art ve kalıcı manikür konusunda uzmanlaşmış, müşteri memnuniyetini ön planda tutan bir uzman.
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PORTFOLYO</Text>
          <View style={styles.portfolioGrid}>
            {PORTFOLIO.map((icon, index) => (
              <View
                key={index}
                style={[styles.portfolioItem, index % 2 === 0 ? styles.portfolioLight : styles.portfolioDark]}
              >
                <Text style={styles.portfolioIcon}>{icon}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>HİZMETLER</Text>
          {SERVICES.map((service) => (
            <TouchableOpacity
              key={service.id}
              style={[styles.serviceCard, selectedService === service.id && styles.serviceCardActive]}
              onPress={() => setSelectedService(service.id)}
            >
              <View>
                <Text style={[styles.serviceName, selectedService === service.id && styles.serviceNameActive]}>
                  {service.name}
                </Text>
                <Text style={[styles.serviceDuration, selectedService === service.id && styles.serviceDurationActive]}>
                  {service.duration}
                </Text>
              </View>
              <Text style={[styles.servicePrice, selectedService === service.id && styles.servicePriceActive]}>
                {service.price}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.bookingSection}>
          <TouchableOpacity
            style={[styles.bookButton, !selectedService && styles.bookButtonDisabled]}
            disabled={!selectedService}
            onPress={() => nav.navigate('BookAppointment', { specialistId: specialist.id, serviceId: selectedService })}
          >
            <Text style={styles.bookButtonText}>Randevu Al</Text>
          </TouchableOpacity>
          {!selectedService && (
            <Text style={styles.bookHint}>Bir hizmet seçin</Text>
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
  backButton: { paddingHorizontal: Spacing[5], paddingTop: Spacing[4], paddingBottom: Spacing[2] },
  backText: { fontFamily: Typography.fontBody, fontSize: 14, color: Colors.primary },
  profileCard: { flexDirection: 'row', alignItems: 'center', gap: Spacing[4], paddingHorizontal: Spacing[5], paddingVertical: Spacing[4], backgroundColor: Colors.surface, marginHorizontal: Spacing[4], borderRadius: BorderRadius.xl, borderWidth: 0.5, borderColor: Colors.border, ...Shadow.sm },
  avatarContainer: { width: 72, height: 72, borderRadius: BorderRadius.xl, backgroundColor: Colors.surfaceWarm, justifyContent: 'center', alignItems: 'center' },
  avatarEmoji: { fontSize: 32 },
  profileInfo: { flex: 1 },
  name: { fontFamily: Typography.fontBodyMedium, fontSize: 20, color: Colors.textPrimary, marginBottom: 2 },
  title: { fontFamily: Typography.fontBody, fontSize: 13, color: Colors.textSecondary, marginBottom: Spacing[1] },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing[2] },
  rating: { fontFamily: Typography.fontBodyMedium, fontSize: 13, color: Colors.textPrimary },
  reviews: { fontFamily: Typography.fontBody, fontSize: 12, color: Colors.textTertiary },
  bio: { fontFamily: Typography.fontBody, fontSize: 13, color: Colors.textSecondary, lineHeight: 20, paddingHorizontal: Spacing[5], paddingVertical: Spacing[4] },
  section: { paddingHorizontal: Spacing[5], marginBottom: Spacing[5] },
  sectionTitle: { fontFamily: Typography.fontBodyMedium, fontSize: 12, color: Colors.textPrimary, letterSpacing: 1, marginBottom: Spacing[3] },
  portfolioGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  portfolioItem: { width: '31%', aspectRatio: 1, borderRadius: BorderRadius.lg, justifyContent: 'center', alignItems: 'center' },
  portfolioLight: { backgroundColor: Colors.surfaceWarm },
  portfolioDark: { backgroundColor: Colors.border },
  portfolioIcon: { fontSize: 28 },
  serviceCard: { backgroundColor: Colors.surface, borderRadius: BorderRadius.lg, padding: Spacing[4], borderWidth: 0.5, borderColor: Colors.border, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing[2], ...Shadow.sm },
  serviceCardActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  serviceName: { fontFamily: Typography.fontBodyMedium, fontSize: 14, color: Colors.textPrimary, marginBottom: 2 },
  serviceNameActive: { color: Colors.surface },
  serviceDuration: { fontFamily: Typography.fontBody, fontSize: 12, color: Colors.textSecondary },
  serviceDurationActive: { color: 'rgba(255,255,255,0.8)' },
  servicePrice: { fontFamily: Typography.fontBodyMedium, fontSize: 15, color: Colors.primary },
  servicePriceActive: { color: Colors.surface },
  bookingSection: { paddingHorizontal: Spacing[5], alignItems: 'center' },
  bookButton: { width: '100%', height: 54, backgroundColor: Colors.primary, borderRadius: BorderRadius.lg, justifyContent: 'center', alignItems: 'center', ...Shadow.md },
  bookButtonDisabled: { opacity: 0.5 },
  bookButtonText: { fontFamily: Typography.fontBodyMedium, fontSize: 15, color: Colors.surface, letterSpacing: 0.5 },
  bookHint: { fontFamily: Typography.fontBody, fontSize: 12, color: Colors.textTertiary, marginTop: Spacing[2] },
});