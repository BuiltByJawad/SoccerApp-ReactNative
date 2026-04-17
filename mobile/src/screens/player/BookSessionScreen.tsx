import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors, spacing, radius } from '../../theme';

const DATES = [
  { day: 'Mon', date: '30', active: false },
  { day: 'Tue', date: '01', active: false },
  { day: 'Wed', date: '02', active: false },
  { day: 'Thu', date: '03', active: false },
  { day: 'Fri', date: '04', active: false },
  { day: 'Sat', date: '05', active: true },
  { day: 'Sun', date: '06', active: false },
];

const SLOTS = [
  { time: '6:00 AM', spots: 8, price: 250 },
  { time: '8:00 AM', spots: 4, price: 250 },
  { time: '4:00 PM', spots: 10, price: 300 },
  { time: '6:00 PM', spots: 2, price: 300 },
];

const FORMATS = ['5v5', '7v7', '11v11'];

export default function BookSessionScreen({ navigation }: any) {
  const [selectedDate, setSelectedDate] = useState(5);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [selectedFormat, setSelectedFormat] = useState('5v5');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Book a Session</Text>
        <View style={{ width: 50 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <Text style={styles.sectionTitle}>Select Date</Text>
        <View style={styles.dateRow}>
          {DATES.map((d, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.dateCard, selectedDate === i && styles.dateCardActive]}
              onPress={() => setSelectedDate(i)}
            >
              <Text style={[styles.dayText, selectedDate === i && styles.dateTextActive]}>{d.day}</Text>
              <Text style={[styles.dateText, selectedDate === i && styles.dateTextActive]}>{d.date}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Format</Text>
        <View style={styles.formatRow}>
          {FORMATS.map((f) => (
            <TouchableOpacity
              key={f}
              style={[styles.formatChip, selectedFormat === f && styles.formatChipActive]}
              onPress={() => setSelectedFormat(f)}
            >
              <Text style={[styles.formatText, selectedFormat === f && styles.formatTextActive]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Available Time Slots</Text>
        <View style={styles.slotList}>
          {SLOTS.map((slot) => (
            <TouchableOpacity
              key={slot.time}
              style={[styles.slotCard, selectedSlot === slot.time && styles.slotCardActive]}
              onPress={() => setSelectedSlot(slot.time)}
            >
              <View style={styles.slotLeft}>
                <Text style={styles.slotTime}>{slot.time}</Text>
                <Text style={styles.slotSpots}>{slot.spots} spots remaining</Text>
              </View>
              <View style={styles.slotRight}>
                <Text style={styles.slotPrice}>BDT {slot.price}</Text>
                <Text style={styles.slotPriceSub}>per person</Text>
              </View>
              {selectedSlot === slot.time && (
                <View style={styles.slotCheck}>
                  <Text style={styles.slotCheckText}>✓</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Booking Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Date</Text>
            <Text style={styles.summaryValue}>Saturday, 05 July 2025</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Time</Text>
            <Text style={styles.summaryValue}>{selectedSlot || '—'}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Format</Text>
            <Text style={styles.summaryValue}>{selectedFormat}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Duration</Text>
            <Text style={styles.summaryValue}>90 Minutes</Text>
          </View>
          <View style={[styles.summaryRow, styles.summaryTotal]}>
            <Text style={styles.summaryTotalLabel}>Total</Text>
            <Text style={styles.summaryTotalValue}>BDT {selectedSlot ? SLOTS.find(s => s.time === selectedSlot)?.price || 0 : 0}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.continueBtn, !selectedSlot && styles.continueBtnDisabled]}
          disabled={!selectedSlot}
          onPress={() => navigation.navigate('Checkout', { sessionId: '1' })}
        >
          <Text style={styles.continueBtnText}>Continue to Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingTop: 60, paddingBottom: spacing.md, backgroundColor: colors.bgCard, borderBottomWidth: 1, borderBottomColor: colors.border },
  back: { color: colors.primary, fontSize: 15, fontWeight: '600', width: 50 },
  title: { fontSize: 17, fontWeight: '700', color: colors.text },
  scroll: { padding: spacing.lg, paddingBottom: 100 },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: colors.text, marginBottom: spacing.md, marginTop: spacing.lg },
  dateRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 6 },
  dateCard: { flex: 1, backgroundColor: colors.bgCard, borderRadius: radius.md, paddingVertical: spacing.sm, alignItems: 'center', borderWidth: 1, borderColor: colors.border },
  dateCardActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  dayText: { fontSize: 10, color: colors.textMuted, marginBottom: 2 },
  dateText: { fontSize: 15, fontWeight: '700', color: colors.text },
  dateTextActive: { color: '#fff' },
  formatRow: { flexDirection: 'row', gap: spacing.sm },
  formatChip: { flex: 1, backgroundColor: colors.bgCard, borderRadius: radius.full, paddingVertical: spacing.sm, alignItems: 'center', borderWidth: 1, borderColor: colors.border },
  formatChipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  formatText: { color: colors.textMuted, fontWeight: '600', fontSize: 14 },
  formatTextActive: { color: '#fff' },
  slotList: { gap: spacing.sm },
  slotCard: { backgroundColor: colors.bgCard, borderRadius: radius.md, padding: spacing.md, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWidth: 1, borderColor: colors.border },
  slotCardActive: { borderColor: colors.primary, backgroundColor: colors.primary + '11' },
  slotLeft: {},
  slotTime: { fontSize: 16, fontWeight: '700', color: colors.text, marginBottom: 2 },
  slotSpots: { fontSize: 12, color: colors.textMuted },
  slotRight: { alignItems: 'flex-end' },
  slotPrice: { fontSize: 16, fontWeight: '800', color: colors.primary },
  slotPriceSub: { fontSize: 10, color: colors.textDim },
  slotCheck: { position: 'absolute', right: spacing.md, width: 22, height: 22, borderRadius: 11, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  slotCheckText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  summaryCard: { backgroundColor: colors.bgCard, borderRadius: radius.lg, padding: spacing.lg, borderWidth: 1, borderColor: colors.border, gap: spacing.sm, marginTop: spacing.lg },
  summaryTitle: { fontSize: 15, fontWeight: '700', color: colors.text, marginBottom: spacing.sm },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  summaryLabel: { fontSize: 13, color: colors.textMuted },
  summaryValue: { fontSize: 13, color: colors.text, fontWeight: '600' },
  summaryTotal: { borderTopWidth: 1, borderTopColor: colors.border, paddingTop: spacing.sm, marginTop: spacing.xs },
  summaryTotalLabel: { fontSize: 15, fontWeight: '700', color: colors.text },
  summaryTotalValue: { fontSize: 20, fontWeight: '800', color: colors.primary },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: colors.bgCard, padding: spacing.lg, borderTopWidth: 1, borderTopColor: colors.border },
  continueBtn: { backgroundColor: colors.primary, borderRadius: radius.full, paddingVertical: 16, alignItems: 'center' },
  continueBtnDisabled: { backgroundColor: colors.border },
  continueBtnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
