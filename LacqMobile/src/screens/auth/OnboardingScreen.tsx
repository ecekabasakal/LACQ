import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors, Typography, Spacing, BorderRadius, Shadow } from '../../theme/tokens';

type Props = {
  navigation: any;
};

const { width } = Dimensions.get('window');

const SLIDES = [
  { id: 1, type: 'brand' },
  { id: 2, type: 'feature', icon: '📅', title: 'Kolayca randevu alın', subtitle: 'Uzmanlardan saniyeler içinde randevu alın, takip edin' },
  { id: 3, type: 'feature', title: 'Uzmanlarımızı tanıyın', subtitle: 'Alanında deneyimli uzmanlarla tanışın, en iyisini seçin' },
  { id: 4, type: 'auth', title: 'Hemen başlayın', subtitle: 'Hesabınızla giriş yapın veya yeni hesap oluşturun' },
];

export const OnboardingScreen = ({ navigation }: Props) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [language, setLanguage] = useState<'TR' | 'EN'>('TR');
  const scrollRef = useRef<ScrollView>(null);

  const goToNext = () => {
    if (currentSlide < SLIDES.length - 1) {
      const nextSlide = currentSlide + 1;
      setCurrentSlide(nextSlide);
      scrollRef.current?.scrollTo({ x: nextSlide * width, animated: true });
    }
  };

  const skip = async () => {
    await AsyncStorage.setItem('hasSeenOnboarding', 'true');
    navigation.navigate('Login');
  };

  const renderDots = (activeIndex: number) => (
    <View style={styles.dots}>
      {SLIDES.map((_, i) => (
        <View key={i} style={[styles.dot, i === activeIndex && styles.dotActive]} />
      ))}
    </View>
  );

  const renderBrandSlide = () => (
    <View style={[styles.slide, styles.slideCenter]}>
      <Text style={styles.brandName}>lacq</Text>
      <Text style={styles.brandTagline}>NAIL & BEAUTY STUDIO</Text>
      <View style={styles.brandLine} />
      {renderDots(0)}
      <Text style={styles.slideTitle}>Güzelliğinizi keşfedin</Text>
      <Text style={styles.slideSubtitle}>Tırnak bakımı ve güzellik hizmetleri için tek adres</Text>
      <TouchableOpacity
        style={styles.primaryButton}
        onPress={async () => {
          await AsyncStorage.setItem('hasSeenOnboarding', 'true');
          goToNext();
        }}
      >
        <Text style={styles.primaryButtonText}>Başlayın →</Text>
      </TouchableOpacity>
      <View style={styles.languageRow}>
        <TouchableOpacity onPress={() => setLanguage('TR')}>
          <Text style={[styles.langOption, language === 'TR' && styles.langActive]}>🇹🇷 TR</Text>
        </TouchableOpacity>
        <Text style={styles.langDivider}>·</Text>
        <TouchableOpacity onPress={() => setLanguage('EN')}>
          <Text style={[styles.langOption, language === 'EN' && styles.langActive]}>🇬🇧 EN</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderFeatureSlide = (slide: typeof SLIDES[0], index: number) => (
  <View style={[styles.slide, styles.slideCenter]}>
    {slide.icon && (
      <View style={styles.featureIcon}>
        <Text style={styles.featureEmoji}>{slide.icon}</Text>
      </View>
    )}
    {renderDots(index)}
    <Text style={styles.slideTitle}>{slide.title}</Text>
    <Text style={styles.slideSubtitle}>{slide.subtitle}</Text>
    <TouchableOpacity style={styles.primaryButton} onPress={goToNext}>
      <Text style={styles.primaryButtonText}>İleri →</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={skip}>
      <Text style={styles.skipText}>Atla</Text>
    </TouchableOpacity>
  </View>
);

  const renderAuthSlide = (slide: typeof SLIDES[0]) => (
  <View style={[styles.slide, styles.slideCenter]}>
    <View style={styles.authDivider} />
    {renderDots(3)}
    <Text style={styles.slideTitle}>{slide.title}</Text>
    <Text style={styles.slideSubtitle}>{slide.subtitle}</Text>
    <TouchableOpacity
      style={styles.primaryButton}
      onPress={async () => {
        await AsyncStorage.setItem('hasSeenOnboarding', 'true');
        navigation.navigate('Login');
      }}
    >
      <Text style={styles.primaryButtonText}>Giriş Yap</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.secondaryButton}
      onPress={async () => {
        await AsyncStorage.setItem('hasSeenOnboarding', 'true');
        navigation.navigate('Login', { screen: 'RegisterScreen' } as any);
      }}
    >
      <Text style={styles.secondaryButtonText}>Hesap Oluştur</Text>
    </TouchableOpacity>
  </View>
);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        style={styles.scrollView}
      >
        {SLIDES.map((slide, index) => (
          <View key={slide.id} style={{ width }}>
            {slide.type === 'brand' && renderBrandSlide()}
            {slide.type === 'feature' && renderFeatureSlide(slide, index)}
            {slide.type === 'auth' && renderAuthSlide(slide)}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  scrollView: { flex: 1 },
  slide: { width, flex: 1, backgroundColor: Colors.background },
  slideCenter: { alignItems: 'center', justifyContent: 'center', paddingHorizontal: Spacing[6], paddingBottom: Spacing[8] },
  brandName: { fontFamily: Typography.fontDisplay, fontSize: 56, color: Colors.textPrimary, letterSpacing: 4, marginBottom: 6 },
  brandTagline: { fontFamily: Typography.fontBody, fontSize: 11, color: Colors.textTertiary, letterSpacing: 3, marginBottom: 12 },
  brandLine: { width: 32, height: 1, backgroundColor: Colors.primary, marginBottom: Spacing[10] },
  dots: { flexDirection: 'row', gap: 6, marginBottom: Spacing[8] },
  dot: { width: 8, height: 3, backgroundColor: Colors.border, borderRadius: 2 },
  dotActive: { width: 24, backgroundColor: Colors.primary },
  featureIcon: { width: 100, height: 100, borderRadius: BorderRadius.xl, backgroundColor: Colors.surface, borderWidth: 0.5, borderColor: Colors.border, justifyContent: 'center', alignItems: 'center', marginBottom: Spacing[6], ...Shadow.sm },
  featureEmoji: { fontSize: 48 },
  authDivider: { width: 32, height: 1, backgroundColor: Colors.primary, marginBottom: Spacing[16] },
  slideTitle: { fontFamily: Typography.fontBodyMedium, fontSize: 24, color: Colors.textPrimary, textAlign: 'center', marginBottom: Spacing[2], lineHeight: 32 },
  slideSubtitle: { fontFamily: Typography.fontBody, fontSize: 14, color: Colors.textSecondary, textAlign: 'center', lineHeight: 22, marginBottom: Spacing[8], paddingHorizontal: Spacing[4] },
  primaryButton: { width: '100%', backgroundColor: Colors.primary, borderRadius: BorderRadius.lg, padding: Spacing[4], alignItems: 'center', marginBottom: Spacing[2], ...Shadow.md },
  primaryButtonText: { fontFamily: Typography.fontBodyMedium, fontSize: 15, color: Colors.surface, letterSpacing: 0.5 },
  secondaryButton: { width: '100%', backgroundColor: Colors.surface, borderRadius: BorderRadius.lg, padding: Spacing[4], alignItems: 'center', borderWidth: 0.5, borderColor: Colors.border, marginTop: Spacing[2] },
  secondaryButtonText: { fontFamily: Typography.fontBodyMedium, fontSize: 15, color: Colors.textPrimary },
  skipText: { fontFamily: Typography.fontBody, fontSize: 13, color: Colors.textTertiary, marginTop: Spacing[2] },
  languageRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing[2], marginTop: Spacing[4] },
  langOption: { fontFamily: Typography.fontBody, fontSize: 13, color: Colors.textTertiary },
  langActive: { color: Colors.textPrimary, fontFamily: Typography.fontBodyMedium },
  langDivider: { color: Colors.textTertiary, fontSize: 13 },
});