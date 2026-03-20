import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors, Typography, Spacing, BorderRadius, Shadow } from '../../theme/tokens';

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

const SERVICES = [
  { id: '1', name: 'Kalıcı Manikür', duration: '60 dk', price: '450₺' },
  { id: '2', name: 'Nail Art', duration: '90 dk', price: '600₺' },
  { id: '3', name: 'Manikür', duration: '45 dk', price: '300₺' },
];

const PORTFOLIO = ['💅', '🌸', '✨', '🎨', '💅', '🌸'];

const DAYS = [
  { day: 'Cuma', date: '21 Mar' },
  { day: 'Cts', date: '22 Mar' },
  { day: 'Pzt', date: '24 Mar' },
  { day: 'Sal', date: '25 Mar' },
];

const HOURS = ['10:00', '11:00', '13:00', '14:00', '15:00', '16:00'];
const UNAVAILABLE = ['15:00'];

export const SpecialistDetailScreen = ({ navigation }: Props) => {
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedHour, setSelectedHour] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

        {/* Geri butonu */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>← Geri</Text>
        </TouchableOpacity>

        {/* Profil */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarEmoji}>👩</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.name}>Ayşe Kaya</Text>
            <Text style={styles.title}>Nail Art Uzmanı · 5 yıl deneyim</Text>
            <View style={styles.ratingRow}>
              <Text style={styles.rating}>⭐ 4.9</Text>
              <Text style={styles.reviews}>128 değerlendirme</Text>
            </View>
          </View>
        </View>

        <Text style={styles.bio}>
          Nail art ve kalıcı manikür konusunda uzmanlaşmış, müşteri memnuniyetini ön planda tutan bir uzman.
        </Text>

        {/* Portfolyo */}
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

        {/* Hizmetler */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>HİZMETLER</Text>
          {SERVICES.map((service) => (
            <TouchableOpacity
              key={service.id}
              style={[styles.serviceCard, selectedService === service.id && styles.serviceCardActive]}
              onPress={() => setSelectedService(service.id)}
            >
              <View>
                <Text style={styles.serviceName}>{service.name}</Text>
                <Text style={styles.serviceDuration}>{service.duration}</Text>
              </View>
              <Text style={[styles.servicePrice, selectedService === service.id && styles.servicePriceActive]}>
                {service.price}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Müsait Saatler */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>MÜSAİT SAATLER</Text>

          {/* Günler */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.daysScroll}>
            <View style={styles.daysRow}>
              {DAYS.map((d, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.dayChip, selectedDay === index && styles.dayChipActive]}
                  onPress={() => setSelectedDay(index)}
                >
                  <Text style={[styles.dayName, selectedDay === index && styles.dayTextActive]}>{d.day}</Text>
                  <Text style={[styles.dayDate, selectedDay === index && styles.dayTextActive]}>{d.date}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* Saatler */}
          <View style={styles.hoursGrid}>
            {HOURS.map((hour) => {
              const unavailable = UNAVAILABLE.includes(hour);
              const selected = selectedHour === hour;
              return (
                <TouchableOpacity
                  key={hour}
                  style={[
                    styles.hourChip,
                    selected && styles.hourChipActive,
                    unavailable && styles.hourChipUnavailable,
                  ]}
                  onPress={() => !unavailable && setSelectedHour(hour)}
                  disabled={unavailable}
                >
                  <Text style={[
                    styles.hourText,
                    selected && styles.hourTextActive,
                    unavailable && styles.hourTextUnavailable,
                  ]}>
                    {hour}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Randevu Al */}
        <View style={styles.bookingSection}>
          <TouchableOpacity
            style={[styles.bookButton, (!selectedService || !selectedHour) && styles.bookButtonDisabled]}
            disabled={!selectedService || !selectedHour}
          >
            <Text style={styles.bookButtonText}>Randevu Al</Text>
          </TouchableOpacity>
          {(!selectedService || !selectedHour) && (
            <Text style={styles.bookHint}>Hizmet ve saat seçin</Text>
          )}
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

  // Geri
  backButton: {
    paddingHorizontal: Spacing[5],
    paddingTop: Spacing[4],
    paddingBottom: Spacing[2],
  },
  backText: {
    fontFamily: Typography.fontBody,
    fontSize: 14,
    color: Colors.primary,
  },

  // Profil
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[4],
    paddingHorizontal: Spacing[5],
    paddingVertical: Spacing[4],
    backgroundColor: Colors.surface,
    marginHorizontal: Spacing[4],
    borderRadius: BorderRadius.xl,
    borderWidth: 0.5,
    borderColor: Colors.border,
    ...Shadow.sm,
  },
  avatarContainer: {
    width: 72,
    height: 72,
    borderRadius: BorderRadius.xl,
    backgroundColor: Colors.surfaceWarm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarEmoji: {
    fontSize: 32,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontFamily: Typography.fontBodyMedium,
    fontSize: 20,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  title: {
    fontFamily: Typography.fontBody,
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: Spacing[1],
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[2],
  },
  rating: {
    fontFamily: Typography.fontBodyMedium,
    fontSize: 13,
    color: Colors.textPrimary,
  },
  reviews: {
    fontFamily: Typography.fontBody,
    fontSize: 12,
    color: Colors.textTertiary,
  },

  // Bio
  bio: {
    fontFamily: Typography.fontBody,
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 20,
    paddingHorizontal: Spacing[5],
    paddingVertical: Spacing[4],
  },

  // Section
  section: {
    paddingHorizontal: Spacing[5],
    marginBottom: Spacing[5],
  },
  sectionTitle: {
    fontFamily: Typography.fontBodyMedium,
    fontSize: 12,
    color: Colors.textPrimary,
    letterSpacing: 1,
    marginBottom: Spacing[3],
  },

  // Portfolyo
  portfolioGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  portfolioItem: {
    width: '31%',
    aspectRatio: 1,
    borderRadius: BorderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  portfolioLight: {
    backgroundColor: Colors.surfaceWarm,
  },
  portfolioDark: {
    backgroundColor: Colors.border,
  },
  portfolioIcon: {
    fontSize: 28,
  },

  // Hizmetler
  serviceCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing[4],
    borderWidth: 0.5,
    borderColor: Colors.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing[2],
    ...Shadow.sm,
  },
  serviceCardActive: {
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  serviceName: {
    fontFamily: Typography.fontBodyMedium,
    fontSize: 14,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  serviceDuration: {
    fontFamily: Typography.fontBody,
    fontSize: 12,
    color: Colors.textSecondary,
  },
  servicePrice: {
    fontFamily: Typography.fontBodyMedium,
    fontSize: 15,
    color: Colors.primary,
  },
  servicePriceActive: {
    color: Colors.primary,
  },

  // Günler
  daysScroll: {
    marginBottom: Spacing[3],
  },
  daysRow: {
    flexDirection: 'row',
    gap: Spacing[2],
    paddingRight: Spacing[5],
  },
  dayChip: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing[3],
    paddingVertical: Spacing[2],
    borderWidth: 0.5,
    borderColor: Colors.border,
    alignItems: 'center',
    minWidth: 64,
  },
  dayChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  dayName: {
    fontFamily: Typography.fontBody,
    fontSize: 11,
    color: Colors.textTertiary,
    marginBottom: 2,
  },
  dayDate: {
    fontFamily: Typography.fontBodyMedium,
    fontSize: 13,
    color: Colors.textPrimary,
  },
  dayTextActive: {
    color: Colors.surface,
  },

  // Saatler
  hoursGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing[2],
  },
  hourChip: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing[4],
    paddingVertical: Spacing[2],
    borderWidth: 0.5,
    borderColor: Colors.border,
  },
  hourChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  hourChipUnavailable: {
    backgroundColor: Colors.border,
    borderColor: Colors.border,
  },
  hourText: {
    fontFamily: Typography.fontBody,
    fontSize: 13,
    color: Colors.textPrimary,
  },
  hourTextActive: {
    color: Colors.surface,
  },
  hourTextUnavailable: {
    color: Colors.textTertiary,
  },

  // Randevu Al
  bookingSection: {
    paddingHorizontal: Spacing[5],
    alignItems: 'center',
  },
  bookButton: {
    width: '100%',
    height: 54,
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadow.md,
  },
  bookButtonDisabled: {
    opacity: 0.5,
  },
  bookButtonText: {
    fontFamily: Typography.fontBodyMedium,
    fontSize: 15,
    color: Colors.surface,
    letterSpacing: 0.5,
  },
  bookHint: {
    fontFamily: Typography.fontBody,
    fontSize: 12,
    color: Colors.textTertiary,
    marginTop: Spacing[2],
  },
});