import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors, spacing, radius } from '../../theme';

const BOOKINGS = [
  { id: 'BK001', venue: 'DBox Sports Complex', type: '5v5 Outdoor', date: 'Sun, 05 July', time: '9:00 AM', status: 'upcoming', amount: 275, split: true },
  { id: 'BK002', venue: 'Premier Football Arena', type: '7v7 Indoor', date: 'Sat, 28 June', time: '6:00 PM', status: 'completed', amount: 350, split: false },
  { id: 'BK003', venue: 'Green Field Club', type: '11v11 Grass', date: 'Sun, 22 June', time: '7:00 AM', status: 'completed', amount: 500, split: true },
  { id: 'BK004', venue: 'City Sports Hub', type: '5v5 Futsal', date: 'Fri, 15 June', time: '8:00 PM', status: 'cancelled', amount: 200, split: false },
];

const STATUS_COLORS: Record<string, string> = {
  upcoming: colors.primary,
  completed: colors.textMuted,
  cancelled: colors.error,
};

const TABS = ['All', 'Upcoming', 'Completed', 'Cancelled'];

export default function MyBookingsScreen({ navigation }: any) {
  const [activeTab, setActiveTab] = useState('All');

  const filtered = BOOKINGS.filter((b) => {
    if (activeTab === 'All') return true;
    return b.status === activeTab.toLowerCase();
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Bookings</Text>
      </View>

      <View style={styles.tabRow}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.tabActive]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {filtered.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>📋</Text>
            <Text style={styles.emptyTitle}>No bookings found</Text>
            <Text style={styles.emptyText}>Your {activeTab.toLowerCase()} bookings will appear here.</Text>
          </View>
        ) : (
          filtered.map((booking) => (
            <View key={booking.id} style={styles.bookingCard}>
              <View style={styles.cardHeader}>
                <View style={styles.venueIconWrap}>
                  <Text style={styles.venueIcon}>🏟️</Text>
                </View>
                <View style={styles.cardHeaderInfo}>
                  <Text style={styles.venueName}>{booking.venue}</Text>
                  <Text style={styles.venueType}>{booking.type}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: STATUS_COLORS[booking.status] + '22', borderColor: STATUS_COLORS[booking.status] + '44' }]}>
                  <Text style={[styles.statusText, { color: STATUS_COLORS[booking.status] }]}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </Text>
                </View>
              </View>

              <View style={styles.cardDivider} />

              <View style={styles.cardDetails}>
                <View style={styles.detailItem}>
                  <Text style={styles.detailIcon}>📅</Text>
                  <Text style={styles.detailText}>{booking.date}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailIcon}>🕐</Text>
                  <Text style={styles.detailText}>{booking.time}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailIcon}>🤝</Text>
                  <Text style={styles.detailText}>{booking.split ? 'Split Pay' : 'Full Pay'}</Text>
                </View>
              </View>

              <View style={styles.cardFooter}>
                <Text style={styles.bookingId}>#{booking.id}</Text>
                <Text style={styles.amount}>BDT {booking.amount}</Text>
              </View>

              {booking.status === 'upcoming' && (
                <View style={styles.cardActions}>
                  <TouchableOpacity style={styles.viewBtn}>
                    <Text style={styles.viewBtnText}>View Details</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.cancelBtn}>
                    <Text style={styles.cancelBtnText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))
        )}
        <View style={{ height: 20 }} />
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.fabText}>+ Book Session</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  header: { paddingHorizontal: spacing.lg, paddingTop: 60, paddingBottom: spacing.md, backgroundColor: colors.bgCard, borderBottomWidth: 1, borderBottomColor: colors.border },
  title: { fontSize: 24, fontWeight: '800', color: colors.text },
  tabRow: { flexDirection: 'row', backgroundColor: colors.bgCard, paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, gap: spacing.xs, borderBottomWidth: 1, borderBottomColor: colors.border },
  tab: { flex: 1, paddingVertical: 6, borderRadius: radius.full, alignItems: 'center' },
  tabActive: { backgroundColor: colors.primary },
  tabText: { fontSize: 11, color: colors.textMuted, fontWeight: '600' },
  tabTextActive: { color: '#fff' },
  scroll: { padding: spacing.lg },
  empty: { alignItems: 'center', paddingTop: 80 },
  emptyIcon: { fontSize: 48, marginBottom: spacing.md },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: colors.text, marginBottom: spacing.sm },
  emptyText: { fontSize: 14, color: colors.textMuted, textAlign: 'center' },
  bookingCard: { backgroundColor: colors.bgCard, borderRadius: radius.lg, padding: spacing.md, borderWidth: 1, borderColor: colors.border, marginBottom: spacing.md },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.sm },
  venueIconWrap: { width: 44, height: 44, borderRadius: radius.md, backgroundColor: colors.inputBg, alignItems: 'center', justifyContent: 'center' },
  venueIcon: { fontSize: 22 },
  cardHeaderInfo: { flex: 1 },
  venueName: { fontSize: 14, fontWeight: '700', color: colors.text },
  venueType: { fontSize: 12, color: colors.textMuted },
  statusBadge: { borderRadius: radius.full, paddingHorizontal: spacing.sm, paddingVertical: 3, borderWidth: 1 },
  statusText: { fontSize: 11, fontWeight: '700' },
  cardDivider: { height: 1, backgroundColor: colors.border, marginBottom: spacing.sm },
  cardDetails: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.sm, flexWrap: 'wrap' },
  detailItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  detailIcon: { fontSize: 12 },
  detailText: { fontSize: 12, color: colors.textMuted },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: spacing.xs },
  bookingId: { fontSize: 12, color: colors.textDim },
  amount: { fontSize: 16, fontWeight: '800', color: colors.primary },
  cardActions: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.md },
  viewBtn: { flex: 1, backgroundColor: colors.primary, borderRadius: radius.full, paddingVertical: 10, alignItems: 'center' },
  viewBtnText: { color: '#fff', fontWeight: '600', fontSize: 13 },
  cancelBtn: { flex: 1, borderRadius: radius.full, paddingVertical: 10, alignItems: 'center', borderWidth: 1, borderColor: colors.error },
  cancelBtnText: { color: colors.error, fontWeight: '600', fontSize: 13 },
  fab: { position: 'absolute', bottom: spacing.xl, right: spacing.lg, backgroundColor: colors.primary, borderRadius: radius.full, paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, elevation: 4 },
  fabText: { color: '#fff', fontWeight: '700', fontSize: 14 },
});
