import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { colors, spacing, radius } from '../../theme';

const BOOKINGS = [
  { id: 'BK001', player: 'John Doe', venue: 'DBox Sports Complex', type: '5v5', date: 'Sun, 05 Jul', time: '9:00 AM', amount: 275, status: 'confirmed', split: true, teammates: 3 },
  { id: 'BK002', player: 'Rahim Ahmed', venue: 'Premier Arena', type: '7v7', date: 'Sun, 05 Jul', time: '6:00 PM', amount: 350, status: 'pending', split: false, teammates: 0 },
  { id: 'BK003', player: 'Sarah Khan', venue: 'Green Field Club', type: '11v11', date: 'Sat, 28 Jun', time: '7:00 AM', amount: 500, status: 'confirmed', split: true, teammates: 4 },
  { id: 'BK004', player: 'Ali Hassan', venue: 'City Sports Hub', type: '5v5', date: 'Fri, 27 Jun', time: '8:00 PM', amount: 200, status: 'cancelled', split: false, teammates: 0 },
  { id: 'BK005', player: 'Maria Begum', venue: 'DBox Sports Complex', type: '5v5', date: 'Thu, 26 Jun', time: '10:00 AM', amount: 275, status: 'confirmed', split: true, teammates: 2 },
];

const STATUS_COLORS: Record<string, string> = {
  confirmed: colors.primary,
  pending: colors.warning,
  cancelled: colors.error,
};

const FILTER_TABS = ['All', 'Confirmed', 'Pending', 'Cancelled'];

export default function AdminBookingsScreen({ navigation }: any) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = BOOKINGS.filter((b) => {
    const matchFilter = activeFilter === 'All' || b.status === activeFilter.toLowerCase();
    const matchSearch = b.player.toLowerCase().includes(search.toLowerCase()) ||
      b.venue.toLowerCase().includes(search.toLowerCase()) ||
      b.id.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const totalRevenue = filtered.reduce((s, b) => s + (b.status !== 'cancelled' ? b.amount : 0), 0);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Manage Bookings</Text>
        <View style={{ width: 60 }} />
      </View>

      <View style={styles.searchWrap}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search bookings, players..."
          placeholderTextColor={colors.textDim}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <View style={styles.filterRow}>
        {FILTER_TABS.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.filterTab, activeFilter === tab && styles.filterTabActive]}
            onPress={() => setActiveFilter(tab)}
          >
            <Text style={[styles.filterTabText, activeFilter === tab && styles.filterTabTextActive]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.revenueBar}>
        <Text style={styles.revenueLabel}>Showing {filtered.length} bookings</Text>
        <Text style={styles.revenueValue}>Revenue: BDT {totalRevenue.toLocaleString()}</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {filtered.map((booking) => (
          <View key={booking.id} style={styles.bookingCard}>
            <View style={styles.cardTop}>
              <View style={styles.playerInfo}>
                <View style={styles.playerAvatar}>
                  <Text style={styles.playerInitials}>{booking.player.split(' ').map(n => n[0]).join('')}</Text>
                </View>
                <View>
                  <Text style={styles.playerName}>{booking.player}</Text>
                  <Text style={styles.bookingId}>#{booking.id}</Text>
                </View>
              </View>
              <View style={[styles.statusChip, { backgroundColor: STATUS_COLORS[booking.status] + '22', borderColor: STATUS_COLORS[booking.status] + '55' }]}>
                <Text style={[styles.statusText, { color: STATUS_COLORS[booking.status] }]}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </Text>
              </View>
            </View>

            <View style={styles.cardDivider} />

            <View style={styles.cardDetails}>
              <View style={styles.detailGrid}>
                {[
                  { icon: '🏟️', value: booking.venue },
                  { icon: '📅', value: `${booking.date} · ${booking.time}` },
                  { icon: '⚽', value: `${booking.type} format` },
                  { icon: booking.split ? '🤝' : '💳', value: booking.split ? `Split (${booking.teammates + 1} players)` : 'Full payment' },
                ].map((d, i) => (
                  <View key={i} style={styles.detailItem}>
                    <Text style={styles.detailIcon}>{d.icon}</Text>
                    <Text style={styles.detailText} numberOfLines={1}>{d.value}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.cardFooter}>
              <Text style={styles.amount}>BDT {booking.amount}</Text>
              {booking.status === 'pending' && (
                <View style={styles.actions}>
                  <TouchableOpacity style={styles.approveBtn}>
                    <Text style={styles.approveBtnText}>✓ Confirm</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.rejectBtn}>
                    <Text style={styles.rejectBtnText}>✕ Reject</Text>
                  </TouchableOpacity>
                </View>
              )}
              {booking.status === 'confirmed' && (
                <TouchableOpacity style={styles.cancelAdminBtn}>
                  <Text style={styles.cancelAdminBtnText}>Cancel Booking</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}

        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingTop: 60, paddingBottom: spacing.md, backgroundColor: colors.bgCard, borderBottomWidth: 1, borderBottomColor: colors.border },
  back: { color: colors.primary, fontSize: 15, fontWeight: '600', width: 60 },
  title: { fontSize: 17, fontWeight: '700', color: colors.text },
  searchWrap: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.inputBg, margin: spacing.lg, borderRadius: radius.full, paddingHorizontal: spacing.md, borderWidth: 1, borderColor: colors.border },
  searchIcon: { marginRight: spacing.sm, fontSize: 14 },
  searchInput: { flex: 1, color: colors.text, fontSize: 14, paddingVertical: 10 },
  filterRow: { flexDirection: 'row', paddingHorizontal: spacing.lg, gap: spacing.xs, marginBottom: spacing.sm },
  filterTab: { flex: 1, paddingVertical: 7, borderRadius: radius.full, alignItems: 'center', backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.border },
  filterTabActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  filterTabText: { fontSize: 11, color: colors.textMuted, fontWeight: '600' },
  filterTabTextActive: { color: '#fff' },
  revenueBar: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.sm },
  revenueLabel: { fontSize: 12, color: colors.textMuted },
  revenueValue: { fontSize: 13, color: colors.primary, fontWeight: '700' },
  scroll: { paddingHorizontal: spacing.lg },
  bookingCard: { backgroundColor: colors.bgCard, borderRadius: radius.lg, padding: spacing.md, marginBottom: spacing.md, borderWidth: 1, borderColor: colors.border },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm },
  playerInfo: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  playerAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.primary + '33', alignItems: 'center', justifyContent: 'center' },
  playerInitials: { color: colors.primary, fontWeight: '800', fontSize: 14 },
  playerName: { fontSize: 14, fontWeight: '700', color: colors.text },
  bookingId: { fontSize: 11, color: colors.textDim },
  statusChip: { borderRadius: radius.full, paddingHorizontal: spacing.sm, paddingVertical: 4, borderWidth: 1 },
  statusText: { fontSize: 11, fontWeight: '700' },
  cardDivider: { height: 1, backgroundColor: colors.border, marginBottom: spacing.sm },
  cardDetails: { marginBottom: spacing.sm },
  detailGrid: { gap: 6 },
  detailItem: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  detailIcon: { fontSize: 13, width: 20 },
  detailText: { fontSize: 12, color: colors.textMuted, flex: 1 },
  cardFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: colors.border, paddingTop: spacing.sm },
  amount: { fontSize: 18, fontWeight: '800', color: colors.primary },
  actions: { flexDirection: 'row', gap: spacing.xs },
  approveBtn: { backgroundColor: colors.primary, borderRadius: radius.full, paddingHorizontal: spacing.md, paddingVertical: 6 },
  approveBtnText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  rejectBtn: { backgroundColor: colors.error + '22', borderRadius: radius.full, paddingHorizontal: spacing.md, paddingVertical: 6, borderWidth: 1, borderColor: colors.error + '44' },
  rejectBtnText: { color: colors.error, fontSize: 12, fontWeight: '700' },
  cancelAdminBtn: { borderRadius: radius.full, paddingHorizontal: spacing.md, paddingVertical: 6, borderWidth: 1, borderColor: colors.error + '44' },
  cancelAdminBtnText: { color: colors.error, fontSize: 12 },
});
