import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, BorderRadius, Shadow } from '../../theme/tokens';

const SPECIALISTS = [
  { id: '1', name: 'Ayşe Kaya', title: 'Nail Art Uzmanı', icon: '👩', type: 'specialist' },
  { id: '2', name: 'Merve Demir', title: 'Kalıcı Uzmanı', icon: '👩', type: 'specialist' },
  { id: '3', name: 'Selin Arslan', title: 'Pedikür Uzmanı', icon: '👩', type: 'specialist' },
];

const SERVICES = [
  { id: '4', name: 'Kalıcı Manikür', title: "60 dk · 450₺'den başlayan", icon: '💅', type: 'service' },
  { id: '5', name: 'Pedikür', title: "45 dk · 350₺'den başlayan", icon: '🦶', type: 'service' },
  { id: '6', name: 'Nail Art', title: "90 dk · 600₺'den başlayan", icon: '🎨', type: 'service' },
  { id: '7', name: 'Tırnak Bakımı', title: "30 dk · 200₺'den başlayan", icon: '🌸', type: 'service' },
];

const ALL_ITEMS = [...SPECIALISTS, ...SERVICES];

type FilterType = 'all' | 'specialist' | 'service';

export const DiscoverScreen = () => {
  const navigation = useNavigation<any>();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredItems = ALL_ITEMS.filter(item => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || item.type === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

        <View style={styles.header}>
          <Text style={styles.headerTitle}>Ara</Text>
        </View>

        <View style={styles.searchWrapper}>
          <View style={[styles.searchContainer, search.length > 0 && styles.searchContainerActive]}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              value={search}
              onChangeText={setSearch}
              placeholder="Uzman veya hizmet ara..."
              placeholderTextColor={Colors.textTertiary}
              autoCorrect={false}
            />
            {search.length > 0 && (
              <TouchableOpacity onPress={() => setSearch('')} style={styles.clearButton}>
                <Text style={styles.clearText}>Temizle</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={styles.filtersRow}>
          {(['all', 'specialist', 'service'] as FilterType[]).map((f) => (
            <TouchableOpacity
              key={f}
              style={[styles.filterChip, filter === f && styles.filterChipActive]}
              onPress={() => setFilter(f)}
            >
              <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>
                {f === 'all' ? 'Tümü' : f === 'specialist' ? 'Uzmanlar' : 'Hizmetler'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.results}>
          {search.length > 0 && (
            <Text style={styles.resultsCount}>SONUÇLAR ({filteredItems.length})</Text>
          )}

          {search.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>🔍</Text>
              <Text style={styles.emptyTitle}>Uzman veya hizmet ara</Text>
              <Text style={styles.emptySubtitle}>Manikür, pedikür, nail art ve daha fazlası</Text>
            </View>
          )}

          {search.length > 0 && filteredItems.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>😕</Text>
              <Text style={styles.emptyTitle}>Sonuç bulunamadı</Text>
              <Text style={styles.emptySubtitle}>Farklı bir arama yapmayı dene</Text>
            </View>
          )}

          {filteredItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.resultCard}
              onPress={() => {
                if (item.type === 'specialist') {
                  navigation.navigate('SpecialistDetail', { specialistId: item.id });
                }
              }}
            >
              <View style={styles.resultAvatar}>
                <Text style={styles.resultIcon}>{item.icon}</Text>
              </View>
              <View style={styles.resultInfo}>
                <Text style={styles.resultName}>{item.name}</Text>
                <Text style={styles.resultTitle}>{item.title}</Text>
              </View>
              <View style={styles.typeBadge}>
                <Text style={styles.typeBadgeText}>
                  {item.type === 'specialist' ? 'Uzman' : 'Hizmet'}
                </Text>
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
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1 },
  header: { paddingHorizontal: Spacing[5], paddingTop: Spacing[6], paddingBottom: Spacing[4] },
  headerTitle: { fontFamily: Typography.fontDisplayRegular, fontSize: 32, color: Colors.textPrimary },
  searchWrapper: { paddingHorizontal: Spacing[4], marginBottom: Spacing[4] },
  searchContainer: { backgroundColor: Colors.surface, borderRadius: BorderRadius.lg, borderWidth: 0.5, borderColor: Colors.border, flexDirection: 'row', alignItems: 'center', paddingHorizontal: Spacing[4], height: 48 },
  searchContainerActive: { borderColor: Colors.primary, borderWidth: 1 },
  searchIcon: { fontSize: 14, marginRight: Spacing[2] },
  searchInput: { flex: 1, fontFamily: Typography.fontBody, fontSize: 14, color: Colors.textPrimary },
  clearButton: { backgroundColor: Colors.background, borderRadius: BorderRadius.sm, paddingHorizontal: Spacing[2], paddingVertical: 4 },
  clearText: { fontFamily: Typography.fontBody, fontSize: 11, color: Colors.textSecondary },
  filtersRow: { flexDirection: 'row', paddingHorizontal: Spacing[4], gap: Spacing[2], marginBottom: Spacing[5] },
  filterChip: { backgroundColor: Colors.surface, borderRadius: BorderRadius.full, paddingHorizontal: Spacing[4], paddingVertical: Spacing[2], borderWidth: 0.5, borderColor: Colors.border },
  filterChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  filterText: { fontFamily: Typography.fontBody, fontSize: 13, color: Colors.textPrimary },
  filterTextActive: { color: Colors.surface },
  results: { paddingHorizontal: Spacing[4] },
  resultsCount: { fontFamily: Typography.fontBodyMedium, fontSize: 11, color: Colors.textTertiary, letterSpacing: 1, marginBottom: Spacing[3] },
  emptyState: { alignItems: 'center', paddingTop: Spacing[12] },
  emptyIcon: { fontSize: 40, marginBottom: Spacing[4] },
  emptyTitle: { fontFamily: Typography.fontBodyMedium, fontSize: 17, color: Colors.textPrimary, marginBottom: Spacing[2] },
  emptySubtitle: { fontFamily: Typography.fontBody, fontSize: 14, color: Colors.textSecondary, textAlign: 'center' },
  resultCard: { backgroundColor: Colors.surface, borderRadius: BorderRadius.xl, padding: Spacing[3], borderWidth: 0.5, borderColor: Colors.border, flexDirection: 'row', alignItems: 'center', marginBottom: Spacing[2], ...Shadow.sm },
  resultAvatar: { width: 44, height: 44, borderRadius: BorderRadius.lg, backgroundColor: Colors.surfaceWarm, justifyContent: 'center', alignItems: 'center', marginRight: Spacing[3] },
  resultIcon: { fontSize: 20 },
  resultInfo: { flex: 1 },
  resultName: { fontFamily: Typography.fontBodyMedium, fontSize: 14, color: Colors.textPrimary, marginBottom: 2 },
  resultTitle: { fontFamily: Typography.fontBody, fontSize: 12, color: Colors.textSecondary },
  typeBadge: { backgroundColor: Colors.background, borderRadius: BorderRadius.md, paddingHorizontal: Spacing[2], paddingVertical: 4, borderWidth: 0.5, borderColor: Colors.border },
  typeBadgeText: { fontFamily: Typography.fontBody, fontSize: 11, color: Colors.textSecondary },
});