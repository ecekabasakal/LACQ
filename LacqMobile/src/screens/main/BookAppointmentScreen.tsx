import React, { useState } from 'react';
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
import { useAppointmentStore } from '../../store/appointmentStore';

type Props = {
  navigation: any;
  route: any;
};

const SERVICES = [
  { id: '1', name: 'Kalıcı Manikür', duration: '60 dk', price: 450 },
  { id: '2', name: 'Nail Art', duration: '90 dk', price: 600 },
  { id: '3', name: 'Pedikür', duration: '45 dk', price: 350 },
  { id: '4', name: 'Manikür', duration: '45 dk', price: 300 },
];

const SPECIALISTS = [
  { id: '1', name: 'Ayşe Kaya', title: 'Nail Art Uzmanı', rating: '4.9', icon: '👩' },
  { id: '2', name: 'Merve Demir', title: 'Kalıcı Uzmanı', rating: '4.8', icon: '👩' },
  { id: '3', name: 'Selin Arslan', title: 'Pedikür Uzmanı', rating: '4.7', icon: '👩' },
];

const DAYS = [
  { day: 'Cuma', date: '21', month: 'Mar' },
  { day: 'Cts', date: '22', month: 'Mar' },
  { day: 'Pzt', date: '24', month: 'Mar' },
  { day: 'Sal', date: '25', month: 'Mar' },
  { day: 'Çar', date: '26', month: 'Mar' },
];

const HOURS = ['10:00', '11:00', '13:00', '14:00', '15:00', '16:00'];
const UNAVAILABLE_HOURS = ['13:00'];

export const BookAppointmentScreen = ({ navigation, route }: Props) => {
  const { addAppointment, appointments } = useAppointmentStore();
  const specialistId = route?.params?.specialistId || null;
  const serviceIdFromRoute = route?.params?.serviceId || null;

  const [step, setStep] = useState(specialistId ? 3 : 2);
  const [selectedService, setSelectedService] = useState<string | null>(serviceIdFromRoute);
  const [selectedSpecialist] = useState<string | null>(specialistId);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedHour, setSelectedHour] = useState<string | null>(null);

  const selectedServiceData = SERVICES.find(s => s.id === selectedService);
  const selectedSpecialistData = SPECIALISTS.find(s => s.id === selectedSpecialist);
  const selectedDayData = selectedDay !== null ? DAYS[selectedDay] : null;

  const totalSteps = specialistId ? 3 : 4;
  const currentStepLabel = specialistId ? step - 2 : step - 1;

  const canProceed = () => {
    if (step === 2) return selectedService !== null;
    if (step === 3) return selectedDay !== null && selectedHour !== null;
    return true;
  };

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > (specialistId ? 3 : 2)) setStep(step - 1);
    else navigation.goBack();
  };

  const handleConfirm = () => {
    const conflict = appointments.find(apt =>
      apt.status === 'upcoming' &&
      apt.date === `${selectedDayData?.date} ${selectedDayData?.month}` &&
      apt.time === selectedHour
    );

    if (conflict) {
      Alert.alert(
        'Randevu Çakışması',
        `${conflict.date} tarihinde saat ${conflict.time}'de zaten bir randevunuz var.`,
        [{ text: 'Tamam' }]
      );
      return;
    }

    const newAppointment = {
      id: Date.now().toString(),
      service: selectedServiceData?.name || '',
      specialist: selectedSpecialistData?.name || '',
      specialistTitle: selectedSpecialistData?.title || '',
      date: `${selectedDayData?.date} ${selectedDayData?.month}`,
      time: selectedHour || '',
      duration: selectedServiceData?.duration || '',
      price: `${selectedServiceData?.price}₺`,
      status: 'upcoming' as const,
      notes: '',
    };
    addAppointment(newAppointment);
    Alert.alert(
      'Randevu Onaylandı! 🎉',
      `${selectedServiceData?.name} randevunuz ${selectedDayData?.date} ${selectedDayData?.month} tarihinde ${selectedHour} saatinde oluşturuldu.`,
      [{ text: 'Tamam', onPress: () => navigation.goBack() }]
    );
  };

  const renderProgressBar = () => (
    <View style={styles.progressBar}>
      {Array.from({ length: totalSteps }, (_, i) => (
        <View
          key={i}
          style={[styles.progressStep, i < currentStepLabel && styles.progressStepActive]}
        />
      ))}
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Hizmet Seç</Text>
      {SERVICES.map(service => (
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
            {service.price}₺
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Tarih & Saat</Text>
      <Text style={styles.subLabel}>TARİH</Text>
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
      <Text style={styles.subLabel}>SAAT</Text>
      <View style={styles.hoursGrid}>
        {HOURS.map(hour => {
          const unavailable = UNAVAILABLE_HOURS.includes(hour);
          const selected = selectedHour === hour;
          return (
            <TouchableOpacity
              key={hour}
              style={[styles.hourChip, selected && styles.hourChipActive, unavailable && styles.hourChipUnavailable]}
              onPress={() => !unavailable && setSelectedHour(hour)}
              disabled={unavailable}
            >
              <Text style={[styles.hourText, selected && styles.hourTextActive, unavailable && styles.hourTextUnavailable]}>
                {hour}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );

  const renderStep4 = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Onay</Text>
      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>RANDEVU ÖZETİ</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryKey}>Hizmet</Text>
          <Text style={styles.summaryValue}>{selectedServiceData?.name || '-'}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryKey}>Uzman</Text>
          <Text style={styles.summaryValue}>{selectedSpecialistData?.name || '-'}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryKey}>Tarih</Text>
          <Text style={styles.summaryValue}>{selectedDayData?.date} {selectedDayData?.month} · {selectedHour}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryKey}>Süre</Text>
          <Text style={styles.summaryValue}>{selectedServiceData?.duration || '-'}</Text>
        </View>
        <View style={[styles.summaryRow, styles.summaryTotal]}>
          <Text style={styles.summaryTotalKey}>Toplam</Text>
          <Text style={styles.summaryTotalValue}>{selectedServiceData?.price ? `${selectedServiceData.price}₺` : '-'}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backText}>← Geri</Text>
        </TouchableOpacity>
        <Text style={styles.stepLabel}>ADIM {currentStepLabel}/{totalSteps}</Text>
        {renderProgressBar()}
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}
        <View style={{ height: 32 }} />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.nextButton, !canProceed() && styles.nextButtonDisabled]}
          onPress={step === 4 ? handleConfirm : handleNext}
          disabled={!canProceed()}
        >
          <Text style={styles.nextButtonText}>
            {step === 4 ? 'Randevuyu Onayla ✓' : 'Devam Et →'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1 },
  header: { backgroundColor: Colors.surface, paddingHorizontal: Spacing[5], paddingTop: Spacing[5], paddingBottom: Spacing[4], borderBottomWidth: 0.5, borderBottomColor: Colors.border },
  backButton: { backgroundColor: Colors.background, borderRadius: BorderRadius.md, paddingHorizontal: Spacing[3], paddingVertical: Spacing[2], alignSelf: 'flex-start', borderWidth: 0.5, borderColor: Colors.border, marginBottom: Spacing[3] },
  backText: { fontFamily: Typography.fontBody, fontSize: 12, color: Colors.primary },
  stepLabel: { fontFamily: Typography.fontBodyMedium, fontSize: 11, color: Colors.textTertiary, letterSpacing: 1, marginBottom: Spacing[2] },
  progressBar: { flexDirection: 'row', gap: 4 },
  progressStep: { flex: 1, height: 3, backgroundColor: Colors.border, borderRadius: 2 },
  progressStepActive: { backgroundColor: Colors.primary },
  stepContent: { padding: Spacing[4] },
  stepTitle: { fontFamily: Typography.fontDisplayRegular, fontSize: 28, color: Colors.textPrimary, marginBottom: Spacing[4] },
  serviceCard: { backgroundColor: Colors.surface, borderRadius: BorderRadius.lg, padding: Spacing[4], borderWidth: 0.5, borderColor: Colors.border, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing[2], ...Shadow.sm },
  serviceCardActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  serviceName: { fontFamily: Typography.fontBodyMedium, fontSize: 15, color: Colors.textPrimary, marginBottom: 2 },
  serviceNameActive: { color: Colors.surface },
  serviceDuration: { fontFamily: Typography.fontBody, fontSize: 12, color: Colors.textSecondary },
  serviceDurationActive: { color: 'rgba(255,255,255,0.8)' },
  servicePrice: { fontFamily: Typography.fontBodyMedium, fontSize: 15, color: Colors.primary },
  servicePriceActive: { color: Colors.surface },
  subLabel: { fontFamily: Typography.fontBodyMedium, fontSize: 11, color: Colors.textTertiary, letterSpacing: 1, marginBottom: Spacing[2] },
  daysScroll: { marginBottom: Spacing[4] },
  daysRow: { flexDirection: 'row', gap: Spacing[2] },
  dayChip: { backgroundColor: Colors.surface, borderRadius: BorderRadius.lg, paddingHorizontal: Spacing[3], paddingVertical: Spacing[2], borderWidth: 0.5, borderColor: Colors.border, alignItems: 'center', minWidth: 56 },
  dayChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  dayName: { fontFamily: Typography.fontBody, fontSize: 11, color: Colors.textTertiary, marginBottom: 2 },
  dayDate: { fontFamily: Typography.fontBodyMedium, fontSize: 15, color: Colors.textPrimary },
  dayTextActive: { color: Colors.surface },
  hoursGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing[2] },
  hourChip: { backgroundColor: Colors.surface, borderRadius: BorderRadius.md, paddingHorizontal: Spacing[4], paddingVertical: Spacing[2], borderWidth: 0.5, borderColor: Colors.border },
  hourChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  hourChipUnavailable: { backgroundColor: Colors.border, borderColor: Colors.border },
  hourText: { fontFamily: Typography.fontBody, fontSize: 13, color: Colors.textPrimary },
  hourTextActive: { color: Colors.surface },
  hourTextUnavailable: { color: Colors.textTertiary },
  summaryCard: { backgroundColor: Colors.surface, borderRadius: BorderRadius.xl, padding: Spacing[4], borderWidth: 0.5, borderColor: Colors.border, ...Shadow.sm },
  summaryLabel: { fontFamily: Typography.fontBodyMedium, fontSize: 10, color: Colors.textTertiary, letterSpacing: 1.5, marginBottom: Spacing[3] },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: Spacing[3] },
  summaryKey: { fontFamily: Typography.fontBody, fontSize: 13, color: Colors.textSecondary },
  summaryValue: { fontFamily: Typography.fontBodyMedium, fontSize: 13, color: Colors.textPrimary },
  summaryTotal: { borderTopWidth: 0.5, borderTopColor: Colors.border, paddingTop: Spacing[3], marginBottom: 0 },
  summaryTotalKey: { fontFamily: Typography.fontBodyMedium, fontSize: 15, color: Colors.textPrimary },
  summaryTotalValue: { fontFamily: Typography.fontBodyMedium, fontSize: 15, color: Colors.primary },
  footer: { padding: Spacing[4], backgroundColor: Colors.surface, borderTopWidth: 0.5, borderTopColor: Colors.border },
  nextButton: { backgroundColor: Colors.primary, borderRadius: BorderRadius.lg, padding: Spacing[4], alignItems: 'center', ...Shadow.md },
  nextButtonDisabled: { opacity: 0.4 },
  nextButtonText: { fontFamily: Typography.fontBodyMedium, fontSize: 15, color: Colors.surface, letterSpacing: 0.5 },
});