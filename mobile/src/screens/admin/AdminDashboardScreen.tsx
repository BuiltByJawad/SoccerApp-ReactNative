import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors, spacing, radius } from '../../theme';

const RECENT_BOOKINGS = [
  { id: 'BK001', player: 'John Doe', venue: 'DBox Sports', time: '9:00 AM', status: 'confirmed', amount: 275 },
  { id: 'BK002', player: 'Rahim Ahmed', venue: 'Premier Arena', time: '6:00 PM', status: 'pending', amount: 350 },
  { id: 'BK003', player: 'Sarah Khan', venue: 'Green Field', time: '7:00 AM', status: 'confirmed', amount: 500 },
  { id: 'BK004', player: 'Ali Hassan', venue: 'City Sports', time: '8:00 PM', status: 'cancelled', amount: 200 },
];

const STATUS_COLORS: Record<string, string> = {
  confirmed: colors.primary,
  pending: colors.warning,
  cancelled: colors.error,
};

export default function AdminDashboardScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Admin Dashboard</Text>
          <Text style={styles.date}>Sunday, 05 July 2025</Text>
        </View>
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => navigation.replace('Auth')}
        >
          <Text style={styles.logoutText}>⏻</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.statsGrid}>
          {[
            { label: 'Total Bookings', value: '247', icon: '📋', delta: '+12%' },
            { label: 'Revenue Today', value: 'BDT 8.4K', icon: '💰', delta: '+8%' },
            { label: 'Active Sessions', value: '6', icon: '🟢', delta: 'Live' },
            { label: 'Venues', value: '4', icon: '🏟️', delta: 'All Active' },
          ].map((stat) => (
            <View key={stat.label} style={styles.statCard}>
              <Text style={styles.statIcon}>{stat.icon}</Text>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
              <Text style={styles.statDelta}>{stat.delta}</Text>
            </View>
          ))}
        </View>

        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Revenue This Week</Text>
          <View style={styles.chartBars}>
            {[40, 65, 50, 80, 55, 90, 70].map((h, i) => (
              <View key={i} style={styles.barWrap}>
                <View style={[styles.bar, { height: h }]} />
                <Text style={styles.barLabel}>{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</Text>
              </View>
            ))}
          </View>
          <View style={styles.chartLegend}>
            <Text style={styles.chartTotal}>Total: BDT 42,600</Text>
            <Text style={styles.chartAvg}>Avg/day: BDT 6,085</Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Bookings</Text>
          <TouchableOpacity onPress={() => navigation.navigate('AdminBookings')}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        {RECENT_BOOKINGS.map((b) => (
          <View key={b.id} style={styles.bookingRow}>
            <View style={styles.bookingIcon}>
              <Text style={styles.bookingIconText}>{b.player.split(' ').map(n => n[0]).join('')}</Text>
            </View>
            <View style={styles.bookingInfo}>
              <Text style={styles.bookingPlayer}>{b.player}</Text>
              <Text style={styles.bookingVenue}>{b.venue} · {b.time}</Text>
            </View>
            <View style={styles.bookingRight}>
              <Text style={styles.bookingAmount}>BDT {b.amount}</Text>
              <View style={[styles.statusPill, { backgroundColor: STATUS_COLORS[b.status] + '22' }]}>
                <Text style={[styles.statusPillText, { color: STATUS_COLORS[b.status] }]}>
                  {b.status}
                </Text>
              </View>
            </View>
          </View>
        ))}

        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionGrid}>
            {[
              { icon: '🏟️', label: 'Manage Venues', onPress: () => navigation.navigate('AdminVenues') },
              { icon: '📋', label: 'Manage Bookings', onPress: () => navigation.navigate('AdminBookings') },
              { icon: '📊', label: 'Reports', onPress: () => {} },
              { icon: '⚙️', label: 'Settings', onPress: () => {} },
            ].map((action) => (
              <TouchableOpacity key={action.label} style={styles.actionCard} onPress={action.onPress}>
                <Text style={styles.actionIcon}>{action.icon}</Text>
                <Text style={styles.actionLabel}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingHorizontal: spacing.lg, paddingTop: 60, paddingBottom: spacing.md, backgroundColor: colors.bgCard, borderBottomWidth: 1, borderBottomColor: colors.border },
  greeting: { fontSize: 22, fontWeight: '800', color: colors.text },
  date: { fontSize: 13, color: colors.textMuted },
  logoutBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.error + '22', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.error + '44' },
  logoutText: { color: colors.error, fontSize: 18 },
  scroll: { padding: spacing.lg },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginBottom: spacing.lg },
  statCard: { backgroundColor: colors.bgCard, borderRadius: radius.lg, padding: spacing.md, width: '47.5%', borderWidth: 1, borderColor: colors.border },
  statIcon: { fontSize: 24, marginBottom: spacing.xs },
  statValue: { fontSize: 22, fontWeight: '800', color: colors.primary, marginBottom: 2 },
  statLabel: { fontSize: 11, color: colors.textMuted, marginBottom: 2 },
  statDelta: { fontSize: 11, color: colors.primaryLight, fontWeight: '600' },
  chartCard: { backgroundColor: colors.bgCard, borderRadius: radius.lg, padding: spacing.lg, borderWidth: 1, borderColor: colors.border, marginBottom: spacing.lg },
  chartTitle: { fontSize: 15, fontWeight: '700', color: colors.text, marginBottom: spacing.md },
  chartBars: { flexDirection: 'row', alignItems: 'flex-end', height: 100, gap: spacing.sm, marginBottom: spacing.sm },
  barWrap: { flex: 1, alignItems: 'center', gap: 4 },
  bar: { width: '100%', backgroundColor: colors.primary, borderRadius: 4, opacity: 0.8 },
  barLabel: { fontSize: 10, color: colors.textMuted },
  chartLegend: { flexDirection: 'row', justifyContent: 'space-between' },
  chartTotal: { fontSize: 13, fontWeight: '700', color: colors.text },
  chartAvg: { fontSize: 12, color: colors.textMuted },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: colors.text, marginBottom: spacing.md },
  seeAll: { color: colors.primary, fontSize: 13 },
  bookingRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.bgCard, borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.sm, borderWidth: 1, borderColor: colors.border, gap: spacing.sm },
  bookingIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.primary + '33', alignItems: 'center', justifyContent: 'center' },
  bookingIconText: { color: colors.primary, fontWeight: '800', fontSize: 14 },
  bookingInfo: { flex: 1 },
  bookingPlayer: { fontSize: 14, fontWeight: '700', color: colors.text },
  bookingVenue: { fontSize: 12, color: colors.textMuted },
  bookingRight: { alignItems: 'flex-end', gap: 4 },
  bookingAmount: { fontSize: 14, fontWeight: '700', color: colors.primary },
  statusPill: { borderRadius: radius.full, paddingHorizontal: spacing.sm, paddingVertical: 2 },
  statusPillText: { fontSize: 10, fontWeight: '700' },
  quickActions: { marginTop: spacing.md },
  actionGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  actionCard: { backgroundColor: colors.bgCard, borderRadius: radius.lg, padding: spacing.lg, width: '47.5%', alignItems: 'center', borderWidth: 1, borderColor: colors.border, gap: spacing.xs },
  actionIcon: { fontSize: 28 },
  actionLabel: { fontSize: 13, fontWeight: '600', color: colors.text, textAlign: 'center' },
});
