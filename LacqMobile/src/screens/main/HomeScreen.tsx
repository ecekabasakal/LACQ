import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Colors, Typography, Spacing, BorderRadius, Shadow } from '../../theme/tokens';
import { useAuthStore } from '../../store/authStore';

const CATEGORIES = ['Manikür', 'Pedikür', 'Kalıcı', 'Nail Art'];

const SPECIALISTS = [
  { id: '1', name: 'Ayşe Kaya', title: 'Nail Art Uzmanı', rating: '4.9', reviews: '128', initials: 'AK' },
  { id: '2', name: 'Merve Demir', title: 'Kalıcı Uzmanı', rating: '4.8', reviews: '94', initials: 'MD' },
];

export const HomeScreen = () => {
  const { user } = useAuthStore();
  const [activeCategory, setActiveCategory] = React.useState(0);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>MERHABA, {user?.firstName?.toUpperCase() || 'ECE'}</Text>
          <Text style={styles.headerTitle}>Bugün kendine iyi bak</Text>
        </View>

        {/* Yaklaşan Randevu */}
        <View style={styles.appointmentCard}>
          <View>
            <Text style={styles.appointmentLabel}>YAKLAŞAN RANDEVU</Text>
            <Text style={styles.appointmentTitle}>Kalıcı Manikür</Text>
            <Text style={styles.appointmentDate}>Cuma, 21 Mart · 14:00</Text>
          </View>
          <TouchableOpacity style={styles.detailButton}>
            <Text style={styles.detailButtonText}>Detay</Text>
          </TouchableOpacity>
        </View>

        {/* Kategoriler */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>KATEGORİLER</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
            {CATEGORIES.map((cat, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.categoryChip, activeCategory === index && styles.categoryChipActive]}
                onPress={() => setActiveCategory(index)}
              >
                <Text style={[styles.categoryText, activeCategory === index && styles.categoryTextActive]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Kampanya Banner */}
        <View style={styles.banner}>
          <Text style={styles.bannerLabel}>ÖZEL FIRSAT</Text>
          <Text style={styles.bannerTitle}>İlk randevunda %20 indirim</Text>
          <Text style={styles.bannerSubtitle}>31 Mart'a kadar geçerli</Text>
          <TouchableOpacity style={styles.bannerButton}>
            <Text style={styles.bannerButtonText}>Hemen Kullan</Text>
          </TouchableOpacity>
        </View>

        {/* Uzmanlar */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>UZMANLAR</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>Tümünü gör</Text>
            </TouchableOpacity>
          </View>

          {SPECIALISTS.map((specialist) => (
            <TouchableOpacity key={specialist.id} style={styles.specialistCard}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{specialist.initials}</Text>
              </View>
              <View style={styles.specialistInfo}>
                <Text style={styles.specialistName}>{specialist.name}</Text>
                <Text style={styles.specialistTitle}>{specialist.title}</Text>
              </View>
              <View style={styles.ratingContainer}>
                <Text style={styles.rating}>⭐ {specialist.rating}</Text>
                <Text style={styles.reviews}>{specialist.reviews} değerlendirme</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 20 }} />
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
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: Spacing[5],
    paddingTop: Spacing[6],
    paddingBottom: Spacing[4],
  },
  greeting: {
    fontFamily: Typography.fontBodyMedium,
    fontSize: 11,
    color: Colors.textTertiary,
    letterSpacing: 1.5,
    marginBottom: Spacing[1],
  },
  headerTitle: {
    fontFamily: Typography.fontDisplayRegular,
    fontSize: 28,
    color: Colors.textPrimary,
  },

  // Randevu kartı
  appointmentCard: {
    marginHorizontal: Spacing[4],
    marginBottom: Spacing[5],
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing[4],
    borderWidth: 0.5,
    borderColor: Colors.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...Shadow.sm,
  },
  appointmentLabel: {
    fontFamily: Typography.fontBodyMedium,
    fontSize: 10,
    color: Colors.textTertiary,
    letterSpacing: 1.5,
    marginBottom: Spacing[1],
  },
  appointmentTitle: {
    fontFamily: Typography.fontBodyMedium,
    fontSize: 15,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  appointmentDate: {
    fontFamily: Typography.fontBody,
    fontSize: 12,
    color: Colors.textSecondary,
  },
  detailButton: {
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing[3],
    paddingVertical: Spacing[2],
    borderWidth: 0.5,
    borderColor: Colors.border,
  },
  detailButtonText: {
    fontFamily: Typography.fontBodyMedium,
    fontSize: 12,
    color: Colors.primary,
  },

  // Kategoriler
  section: {
    paddingHorizontal: Spacing[5],
    marginBottom: Spacing[5],
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing[3],
  },
  sectionTitle: {
    fontFamily: Typography.fontBodyMedium,
    fontSize: 12,
    color: Colors.textPrimary,
    letterSpacing: 1,
    marginBottom: Spacing[3],
  },
  seeAll: {
    fontFamily: Typography.fontBody,
    fontSize: 12,
    color: Colors.primary,
  },
  categoriesScroll: {
    marginLeft: -Spacing[5],
    paddingLeft: Spacing[5],
  },
  categoryChip: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing[4],
    paddingVertical: Spacing[2],
    marginRight: Spacing[2],
    borderWidth: 0.5,
    borderColor: Colors.border,
  },
  categoryChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  categoryText: {
    fontFamily: Typography.fontBody,
    fontSize: 13,
    color: Colors.textPrimary,
  },
  categoryTextActive: {
    color: Colors.surface,
  },

  // Banner
  banner: {
    marginHorizontal: Spacing[4],
    marginBottom: Spacing[5],
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.xl,
    padding: Spacing[5],
  },
  bannerLabel: {
    fontFamily: Typography.fontBodyMedium,
    fontSize: 10,
    color: 'rgba(255,255,255,0.85)',
    letterSpacing: 1.5,
    marginBottom: Spacing[1],
  },
  bannerTitle: {
    fontFamily: Typography.fontBodyMedium,
    fontSize: 17,
    color: Colors.surface,
    marginBottom: 4,
  },
  bannerSubtitle: {
    fontFamily: Typography.fontBody,
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: Spacing[4],
  },
  bannerButton: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing[4],
    paddingVertical: Spacing[2],
    alignSelf: 'flex-start',
  },
  bannerButtonText: {
    fontFamily: Typography.fontBodyMedium,
    fontSize: 12,
    color: Colors.primary,
  },

  // Uzman kartları
  specialistCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing[4],
    borderWidth: 0.5,
    borderColor: Colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing[3],
    ...Shadow.sm,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.surfaceWarm,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing[3],
  },
  avatarText: {
    fontFamily: Typography.fontBodyMedium,
    fontSize: 13,
    color: Colors.textSecondary,
  },
  specialistInfo: {
    flex: 1,
  },
  specialistName: {
    fontFamily: Typography.fontBodyMedium,
    fontSize: 14,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  specialistTitle: {
    fontFamily: Typography.fontBody,
    fontSize: 12,
    color: Colors.textSecondary,
  },
  ratingContainer: {
    alignItems: 'flex-end',
  },
  rating: {
    fontFamily: Typography.fontBodyMedium,
    fontSize: 13,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  reviews: {
    fontFamily: Typography.fontBody,
    fontSize: 11,
    color: Colors.textSecondary,
  },
});