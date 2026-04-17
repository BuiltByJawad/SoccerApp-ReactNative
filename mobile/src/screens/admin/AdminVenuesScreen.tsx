import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors, spacing, radius } from '../../theme';

const VENUES = [
  { id: '1', name: 'DBox Sports Complex', type: '5v5 Outdoor', location: 'Gulshan', slots: 6, bookings: 47, revenue: 12500, active: true },
  { id: '2', name: 'Premier Football Arena', type: '7v7 Indoor', location: 'Dhanmondi', slots: 4, bookings: 32, revenue: 9800, active: true },
  { id: '3', name: 'Green Field Club', type: '11v11 Grass', location: 'Mirpur', slots: 3, bookings: 28, revenue: 14200, active: true },
  { id: '4', name: 'City Sports Hub', type: '5v5 Futsal', location: 'Uttara', slots: 8, bookings: 55, revenue: 8400, active: false },
];

export default function AdminVenuesScreen({ navigation }: any) {
  const [venues, setVenues] = useState(VENUES);

  const toggleActive = (id: string) => {
    setVenues(prev => prev.map(v => v.id === id ? { ...v, active: !v.active } : v));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Manage Venues</Text>
        <TouchableOpacity style={styles.addBtn}>
          <Text style={styles.addBtnText}>+ Add</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.summaryRow}>
          {[
            { label: 'Total Venues', value: venues.length },
            { label: 'Active', value: venues.filter(v => v.active).length },
            { label: 'Total Bookings', value: venues.reduce((s, v) => s + v.bookings, 0) },
          ].map((s) => (
            <View key={s.label} style={styles.summaryCard}>
              <Text style={styles.summaryValue}>{s.value}</Text>
              <Text style={styles.summaryLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {venues.map((venue) => (
          <View key={venue.id} style={styles.venueCard}>
            <View style={styles.venueBanner}>
              <Text style={styles.venueBannerEmoji}>🏟️</Text>
              <View style={[styles.activeBadge, !venue.active && styles.inactiveBadge]}>
                <Text style={[styles.activeBadgeText, !venue.active && styles.inactiveBadgeText]}>
                  {venue.active ? 'Active' : 'Inactive'}
                </Text>
              </View>
            </View>

            <View style={styles.venueBody}>
              <View style={styles.venueTitleRow}>
                <Text style={styles.venueName}>{venue.name}</Text>
                <TouchableOpacity
                  style={[styles.toggleBtn, venue.active && styles.toggleBtnActive]}
                  onPress={() => toggleActive(venue.id)}
                >
                  <Text style={styles.toggleBtnText}>{venue.active ? 'Disable' : 'Enable'}</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.venueType}>{venue.type} · 📍 {venue.location}</Text>

              <View style={styles.venueStatsRow}>
                {[
                  { label: 'Slots', value: venue.slots },
                  { label: 'Bookings', value: venue.bookings },
                  { label: 'Revenue', value: `৳${(venue.revenue / 1000).toFixed(1)}K` },
                ].map((s) => (
                  <View key={s.label} style={styles.venueStat}>
                    <Text style={styles.venueStatValue}>{s.value}</Text>
                    <Text style={styles.venueStatLabel}>{s.label}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.venueActions}>
                <TouchableOpacity style={styles.editBtn}>
                  <Text style={styles.editBtnText}>✏️ Edit Details</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.slotsBtn}>
                  <Text style={styles.slotsBtnText}>🕐 Manage Slots</Text>
                </TouchableOpacity>
              </View>
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
  addBtn: { backgroundColor: colors.primary, borderRadius: radius.full, paddingHorizontal: spacing.md, paddingVertical: 6 },
  addBtnText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  scroll: { padding: spacing.lg },
  summaryRow: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.lg },
  summaryCard: { flex: 1, backgroundColor: colors.bgCard, borderRadius: radius.md, padding: spacing.md, alignItems: 'center', borderWidth: 1, borderColor: colors.border },
  summaryValue: { fontSize: 22, fontWeight: '800', color: colors.primary },
  summaryLabel: { fontSize: 10, color: colors.textMuted, marginTop: 2, textAlign: 'center' },
  venueCard: { backgroundColor: colors.bgCard, borderRadius: radius.lg, overflow: 'hidden', borderWidth: 1, borderColor: colors.border, marginBottom: spacing.md },
  venueBanner: { height: 80, backgroundColor: colors.bgCardAlt, alignItems: 'center', justifyContent: 'center' },
  venueBannerEmoji: { fontSize: 36 },
  activeBadge: { position: 'absolute', top: 10, left: 10, backgroundColor: colors.primary + '22', borderRadius: radius.full, paddingHorizontal: spacing.sm, paddingVertical: 3, borderWidth: 1, borderColor: colors.primary + '44' },
  inactiveBadge: { backgroundColor: colors.error + '22', borderColor: colors.error + '44' },
  activeBadgeText: { color: colors.primary, fontSize: 11, fontWeight: '700' },
  inactiveBadgeText: { color: colors.error },
  venueBody: { padding: spacing.md },
  venueTitleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  venueName: { fontSize: 15, fontWeight: '700', color: colors.text, flex: 1 },
  toggleBtn: { backgroundColor: colors.error + '22', borderRadius: radius.full, paddingHorizontal: spacing.sm, paddingVertical: 4, borderWidth: 1, borderColor: colors.error + '44' },
  toggleBtnActive: { backgroundColor: colors.error + '22' },
  toggleBtnText: { color: colors.error, fontSize: 11, fontWeight: '700' },
  venueType: { fontSize: 12, color: colors.textMuted, marginBottom: spacing.md },
  venueStatsRow: { flexDirection: 'row', backgroundColor: colors.inputBg, borderRadius: radius.md, padding: spacing.sm, marginBottom: spacing.md },
  venueStat: { flex: 1, alignItems: 'center' },
  venueStatValue: { fontSize: 18, fontWeight: '800', color: colors.primary },
  venueStatLabel: { fontSize: 10, color: colors.textMuted },
  venueActions: { flexDirection: 'row', gap: spacing.sm },
  editBtn: { flex: 1, backgroundColor: colors.inputBg, borderRadius: radius.full, paddingVertical: 10, alignItems: 'center', borderWidth: 1, borderColor: colors.border },
  editBtnText: { color: colors.text, fontSize: 12, fontWeight: '600' },
  slotsBtn: { flex: 1, backgroundColor: colors.primary + '22', borderRadius: radius.full, paddingVertical: 10, alignItems: 'center', borderWidth: 1, borderColor: colors.primary + '44' },
  slotsBtnText: { color: colors.primary, fontSize: 12, fontWeight: '600' },
});
