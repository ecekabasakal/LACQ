import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { Colors, Typography, Spacing, BorderRadius, Shadow } from '../../theme/tokens';
import { useAuthStore } from '../../store/authStore';

const CATEGORIES = [
  { label: 'Manikür', icon: '💅' },
  { label: 'Pedikür', icon: '🦶' },
  { label: 'Kalıcı', icon: '✨' },
  { label: 'Nail Art', icon: '🎨' },
  { label: 'Bakım', icon: '🌸' },
];

const SPECIALISTS = [
  { id: '1', name: 'Ayşe Kaya', title: 'Nail Art Uzmanı', rating: '4.9', reviews: '128', icon: '👩' },
  { id: '2', name: 'Merve Demir', title: 'Kalıcı Uzmanı', rating: '4.8', reviews: '94', icon: '👩' },
];

export const HomeScreen = () => {
  const { user } = useAuthStore();
  const [activeCategory, setActiveCategory] = useState(0);
  const [search, setSearch] = useState('');

  const initials = user?.firstName && user?.lastName
    ? `${user.firstName[0]}${user.lastName[0]}`
    : 'EK';

  const firstName = user?.firstName || 'Ece';

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>MERHABA, {firstName.toUpperCase()} 👋</Text>
            <Text style={styles.headerTitle}>Bugün kendine{'\n'}iyi bak</Text>
          </View>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarInitials}>{initials}</Text>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
            placeholder="Uzman veya hizmet ara..."
            placeholderTextColor={Colors.textTertiary}
          />
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
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.categoriesRow}>
              {CATEGORIES.map((cat, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.categoryItem}
                  onPress={() => setActiveCategory(index)}
                >
                  <View style={[styles.categoryIcon, activeCategory === index && styles.categoryIconActive]}>
                    <Text style={styles.categoryEmoji}>{cat.icon}</Text>
                  </View>
                  <Text style={[styles.categoryLabel, activeCategory === index && styles.categoryLabelActive]}>
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
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
              <View style={styles.specialistAvatar}>
                <Text style={styles.specialistEmoji}>{specialist.icon}</Text>
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
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
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
    fontSize: 26,
    color: Colors.textPrimary,
    lineHeight: 32,
  },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surfaceWarm,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: Colors.border,
  },
  avatarInitials: {
    fontFamily: Typography.fontBodyMedium,
    fontSize: 13,
    color: Colors.primary,
  },

  // Search
  searchContainer: {
    marginHorizontal: Spacing[4],
    marginBottom: Spacing[4],
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    borderWidth: 0.5,
    borderColor: Colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing[4],
    height: 44,
  },
  searchIcon: {
    fontSize: 14,
    marginRight: Spacing[2],
  },
  searchInput: {
    flex: 1,
    fontFamily: Typography.fontBody,
    fontSize: 14,
    color: Colors.textPrimary,
  },

  // Randevu
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
  categoriesRow: {
    flexDirection: 'row',
    gap: Spacing[3],
    paddingRight: Spacing[5],
  },
  categoryItem: {
    alignItems: 'center',
    width: 60,
  },
  categoryIcon: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.surface,
    borderWidth: 0.5,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing[2],
  },
  categoryIconActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  categoryEmoji: {
    fontSize: 22,
  },
  categoryLabel: {
    fontFamily: Typography.fontBody,
    fontSize: 11,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  categoryLabelActive: {
    color: Colors.primary,
    fontFamily: Typography.fontBodyMedium,
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

  // Uzmanlar
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
  specialistAvatar: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.surfaceWarm,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing[3],
  },
  specialistEmoji: {
    fontSize: 22,
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