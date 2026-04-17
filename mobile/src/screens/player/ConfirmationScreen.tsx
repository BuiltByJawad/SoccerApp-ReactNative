import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { colors, spacing, radius } from '../../theme';

export default function ConfirmationScreen({ navigation, route }: any) {
  const { bookingId } = route.params;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.successCircle}>
          <View style={styles.successInner}>
            <Text style={styles.successIcon}>✓</Text>
          </View>
        </View>

        <Text style={styles.title}>Booking Confirmed!</Text>
        <Text style={styles.subtitle}>Your session has been reserved. Get ready to play!</Text>

        <View style={styles.bookingIdBox}>
          <Text style={styles.bookingIdLabel}>Booking ID</Text>
          <Text style={styles.bookingIdValue}>#{bookingId}</Text>
        </View>

        <View style={styles.detailCard}>
          {[
            { label: 'Event', value: 'Sunday Fun Day — Morning Session' },
            { label: 'Date', value: 'Sunday, 05 July 2025' },
            { label: 'Time', value: '9:00 AM – 10:30 AM' },
            { label: 'Venue', value: 'DBox Sports Complex' },
            { label: 'Ground', value: 'Outdoor Turf 5v5' },
            { label: 'Payment', value: 'BDT 275 (Split)' },
            { label: 'Status', value: '✅ Paid' },
          ].map((item) => (
            <View key={item.label} style={styles.detailRow}>
              <Text style={styles.detailLabel}>{item.label}</Text>
              <Text style={styles.detailValue}>{item.value}</Text>
            </View>
          ))}
        </View>

        <View style={styles.splitStatusCard}>
          <Text style={styles.splitStatusTitle}>Split Payment Status</Text>
          <View style={styles.splitStatusRow}>
            {['You', 'Player 2', 'Player 3', 'Player 4', 'Player 5'].map((p, i) => (
              <View key={p} style={styles.playerDot}>
                <View style={[styles.playerCircle, i === 0 && styles.playerCirclePaid]}>
                  <Text style={styles.playerInitial}>{p[0]}</Text>
                </View>
                <Text style={styles.playerName}>{p}</Text>
                <Text style={[styles.playerStatus, i === 0 && styles.playerStatusPaid]}>
                  {i === 0 ? 'Paid' : 'Pending'}
                </Text>
              </View>
            ))}
          </View>
          <Text style={styles.splitNote}>Teammates have until 12 hours before the session to pay.</Text>
        </View>

        <View style={styles.reminderCard}>
          <Text style={styles.reminderIcon}>⏰</Text>
          <View style={styles.reminderText}>
            <Text style={styles.reminderTitle}>Set a Reminder</Text>
            <Text style={styles.reminderSub}>We'll notify you 24 hours before your session</Text>
          </View>
          <View style={styles.reminderBadge}>
            <Text style={styles.reminderBadgeText}>On</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.viewBookingsBtn}
          onPress={() => navigation.navigate('MainTabs', { screen: 'Bookings' })}
        >
          <Text style={styles.viewBookingsText}>View My Bookings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.homeBtn}
          onPress={() => navigation.navigate('MainTabs', { screen: 'Home' })}
        >
          <Text style={styles.homeBtnText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  scroll: { paddingHorizontal: spacing.lg, paddingTop: 80, paddingBottom: 120, alignItems: 'center' },
  successCircle: { width: 100, height: 100, borderRadius: 50, borderWidth: 3, borderColor: colors.primary + '44', alignItems: 'center', justifyContent: 'center', marginBottom: spacing.lg },
  successInner: { width: 80, height: 80, borderRadius: 40, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  successIcon: { fontSize: 36, color: '#fff', fontWeight: '800' },
  title: { fontSize: 26, fontWeight: '800', color: colors.text, marginBottom: spacing.sm, textAlign: 'center' },
  subtitle: { fontSize: 14, color: colors.textMuted, textAlign: 'center', marginBottom: spacing.xl, lineHeight: 22 },
  bookingIdBox: { backgroundColor: colors.bgCard, borderRadius: radius.md, paddingVertical: spacing.sm, paddingHorizontal: spacing.lg, marginBottom: spacing.lg, borderWidth: 1, borderColor: colors.border, alignItems: 'center' },
  bookingIdLabel: { fontSize: 11, color: colors.textMuted, marginBottom: 2 },
  bookingIdValue: { fontSize: 18, fontWeight: '800', color: colors.primary, letterSpacing: 2 },
  detailCard: { backgroundColor: colors.bgCard, borderRadius: radius.lg, padding: spacing.lg, borderWidth: 1, borderColor: colors.border, width: '100%', marginBottom: spacing.lg, gap: spacing.sm },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  detailLabel: { fontSize: 13, color: colors.textMuted, flex: 1 },
  detailValue: { fontSize: 13, color: colors.text, fontWeight: '600', flex: 1.5, textAlign: 'right' },
  splitStatusCard: { backgroundColor: colors.bgCard, borderRadius: radius.lg, padding: spacing.lg, borderWidth: 1, borderColor: colors.border, width: '100%', marginBottom: spacing.lg },
  splitStatusTitle: { fontSize: 14, fontWeight: '700', color: colors.text, marginBottom: spacing.md },
  splitStatusRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.md },
  playerDot: { alignItems: 'center', gap: 4 },
  playerCircle: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.inputBg, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: colors.border },
  playerCirclePaid: { backgroundColor: colors.primary + '33', borderColor: colors.primary },
  playerInitial: { color: colors.text, fontWeight: '700', fontSize: 14 },
  playerName: { fontSize: 10, color: colors.textMuted },
  playerStatus: { fontSize: 10, color: colors.textDim },
  playerStatusPaid: { color: colors.primary, fontWeight: '700' },
  splitNote: { fontSize: 11, color: colors.textDim, textAlign: 'center' },
  reminderCard: { backgroundColor: colors.bgCard, borderRadius: radius.lg, padding: spacing.md, borderWidth: 1, borderColor: colors.border, width: '100%', flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  reminderIcon: { fontSize: 28 },
  reminderText: { flex: 1 },
  reminderTitle: { fontSize: 14, fontWeight: '700', color: colors.text },
  reminderSub: { fontSize: 12, color: colors.textMuted },
  reminderBadge: { backgroundColor: colors.primary, borderRadius: radius.full, paddingHorizontal: spacing.sm, paddingVertical: 3 },
  reminderBadgeText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: colors.bgCard, padding: spacing.lg, borderTopWidth: 1, borderTopColor: colors.border, gap: spacing.sm },
  viewBookingsBtn: { backgroundColor: colors.primary, borderRadius: radius.full, paddingVertical: 14, alignItems: 'center' },
  viewBookingsText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  homeBtn: { backgroundColor: colors.bgCardAlt, borderRadius: radius.full, paddingVertical: 14, alignItems: 'center', borderWidth: 1, borderColor: colors.border },
  homeBtnText: { color: colors.text, fontWeight: '600', fontSize: 15 },
});
