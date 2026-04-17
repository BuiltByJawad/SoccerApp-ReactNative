import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  TextInput, StatusBar,
} from 'react-native';
import { colors, spacing, radius } from '../../theme';

const VENUES = [
  { id: '1', name: 'DBox Sports Complex', type: '5v5 Outdoor Turf', location: 'Gulshan, Dhaka', price: 250, rating: 4.8, available: 3, tags: ['5v5', 'Outdoor'] },
  { id: '2', name: 'Premier Football Arena', type: '7v7 Indoor', location: 'Dhanmondi, Dhaka', price: 350, rating: 4.6, available: 1, tags: ['7v7', 'Indoor'] },
  { id: '3', name: 'Green Field Club', type: '11v11 Grass', location: 'Mirpur, Dhaka', price: 500, rating: 4.9, available: 5, tags: ['11v11', 'Grass'] },
  { id: '4', name: 'City Sports Hub', type: '5v5 Futsal', location: 'Uttara, Dhaka', price: 200, rating: 4.5, available: 2, tags: ['5v5', 'Futsal'] },
];

const FILTERS = ['All', '5v5', '7v7', '11v11', 'Indoor', 'Outdoor'];

export default function HomeScreen({ navigation }: any) {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = VENUES.filter((v) => {
    const matchSearch = v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.location.toLowerCase().includes(search.toLowerCase());
    const matchFilter = activeFilter === 'All' || v.tags.includes(activeFilter);
    return matchSearch && matchFilter;
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.bg} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.heroSection}>
          <View style={styles.greetRow}>
            <View>
              <Text style={styles.greeting}>Good Morning 👋</Text>
              <Text style={styles.name}>Ready to play?</Text>
            </View>
            <TouchableOpacity style={styles.notifBtn}>
              <Text style={styles.notifIcon}>🔔</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.searchWrap}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search venues, locations..."
              placeholderTextColor={colors.textDim}
              value={search}
              onChangeText={setSearch}
            />
          </View>
        </View>

        <View style={styles.statsRow}>
          {[
            { label: 'Sessions Played', value: '12' },
            { label: 'Venues Visited', value: '4' },
            { label: 'Total Hours', value: '18h' },
          ].map((s) => (
            <View key={s.label} style={styles.statCard}>
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Sessions</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.upcomingScroll}>
            {[
              { date: 'Today', time: '6:00 PM', venue: 'DBox Sports', sport: '5v5' },
              { date: 'Sunday', time: '9:00 AM', venue: 'Premier Arena', sport: '7v7' },
            ].map((s, i) => (
              <View key={i} style={styles.upcomingCard}>
                <View style={styles.upcomingDateBadge}>
                  <Text style={styles.upcomingDate}>{s.date}</Text>
                </View>
                <Text style={styles.upcomingTime}>{s.time}</Text>
                <Text style={styles.upcomingVenue}>{s.venue}</Text>
                <View style={styles.upcomingSportBadge}>
                  <Text style={styles.upcomingSport}>{s.sport}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll} contentContainerStyle={styles.filterContent}>
          {FILTERS.map((f) => (
            <TouchableOpacity
              key={f}
              style={[styles.filterChip, activeFilter === f && styles.filterChipActive]}
              onPress={() => setActiveFilter(f)}
            >
              <Text style={[styles.filterText, activeFilter === f && styles.filterTextActive]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Venues Near You</Text>
          </View>

          <View style={styles.venueList}>
            {filtered.map((venue) => (
              <TouchableOpacity
                key={venue.id}
                style={styles.venueCard}
                onPress={() => navigation.navigate('VenueDetails', { venueId: venue.id })}
              >
                <View style={styles.venueBanner}>
                  <Text style={styles.venueBannerEmoji}>🏟️</Text>
                  <View style={styles.venueAvailBadge}>
                    <Text style={styles.venueAvailText}>{venue.available} slots</Text>
                  </View>
                </View>
                <View style={styles.venueInfo}>
                  <View style={styles.venueTopRow}>
                    <Text style={styles.venueName}>{venue.name}</Text>
                    <Text style={styles.venueRating}>⭐ {venue.rating}</Text>
                  </View>
                  <Text style={styles.venueType}>{venue.type}</Text>
                  <View style={styles.venueBottomRow}>
                    <Text style={styles.venueLocation}>📍 {venue.location}</Text>
                    <Text style={styles.venuePrice}>BDT {venue.price}<Text style={styles.venuePricePer}>/person</Text></Text>
                  </View>
                  <View style={styles.venueTags}>
                    {venue.tags.map((t) => (
                      <View key={t} style={styles.tag}>
                        <Text style={styles.tagText}>{t}</Text>
                      </View>
                    ))}
                  </View>
                </View>
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
  heroSection: { backgroundColor: colors.bgCard, paddingHorizontal: spacing.lg, paddingTop: 60, paddingBottom: spacing.lg, borderBottomLeftRadius: radius.xl, borderBottomRightRadius: radius.xl },
  greetRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: spacing.md },
  greeting: { fontSize: 14, color: colors.textMuted },
  name: { fontSize: 24, fontWeight: '800', color: colors.text, marginTop: 2 },
  notifBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.inputBg, alignItems: 'center', justifyContent: 'center' },
  notifIcon: { fontSize: 18 },
  searchWrap: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.inputBg, borderRadius: radius.full, paddingHorizontal: spacing.md, borderWidth: 1, borderColor: colors.border },
  searchIcon: { marginRight: spacing.sm, fontSize: 16 },
  searchInput: { flex: 1, color: colors.text, fontSize: 14, paddingVertical: 12 },
  statsRow: { flexDirection: 'row', paddingHorizontal: spacing.lg, paddingVertical: spacing.lg, gap: spacing.sm },
  statCard: { flex: 1, backgroundColor: colors.bgCard, borderRadius: radius.md, padding: spacing.md, alignItems: 'center', borderWidth: 1, borderColor: colors.border },
  statValue: { fontSize: 22, fontWeight: '800', color: colors.primary },
  statLabel: { fontSize: 10, color: colors.textMuted, marginTop: 2, textAlign: 'center' },
  section: { paddingHorizontal: spacing.lg, marginBottom: spacing.lg },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: colors.text },
  seeAll: { color: colors.primary, fontSize: 13 },
  upcomingScroll: { marginHorizontal: -spacing.lg, paddingHorizontal: spacing.lg },
  upcomingCard: { backgroundColor: colors.bgCard, borderRadius: radius.lg, padding: spacing.md, marginRight: spacing.md, width: 160, borderWidth: 1, borderColor: colors.border },
  upcomingDateBadge: { backgroundColor: colors.primary + '22', borderRadius: radius.sm, paddingHorizontal: spacing.sm, paddingVertical: 2, alignSelf: 'flex-start', marginBottom: spacing.sm },
  upcomingDate: { color: colors.primary, fontSize: 11, fontWeight: '700' },
  upcomingTime: { fontSize: 18, fontWeight: '800', color: colors.text, marginBottom: 2 },
  upcomingVenue: { fontSize: 12, color: colors.textMuted, marginBottom: spacing.sm },
  upcomingSportBadge: { backgroundColor: colors.border, borderRadius: radius.sm, paddingHorizontal: spacing.sm, paddingVertical: 2, alignSelf: 'flex-start' },
  upcomingSport: { color: colors.text, fontSize: 11, fontWeight: '600' },
  filterScroll: { marginHorizontal: -spacing.lg, marginBottom: spacing.md },
  filterContent: { paddingHorizontal: spacing.lg, gap: spacing.sm },
  filterChip: { paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: radius.full, backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.border },
  filterChipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  filterText: { color: colors.textMuted, fontSize: 13, fontWeight: '600' },
  filterTextActive: { color: '#fff' },
  venueList: { gap: spacing.md },
  venueCard: { backgroundColor: colors.bgCard, borderRadius: radius.lg, overflow: 'hidden', borderWidth: 1, borderColor: colors.border },
  venueBanner: { height: 120, backgroundColor: colors.bgCardAlt, alignItems: 'center', justifyContent: 'center' },
  venueBannerEmoji: { fontSize: 48 },
  venueAvailBadge: { position: 'absolute', top: 10, right: 10, backgroundColor: colors.primary, borderRadius: radius.full, paddingHorizontal: spacing.sm, paddingVertical: 3 },
  venueAvailText: { color: '#fff', fontSize: 11, fontWeight: '700' },
  venueInfo: { padding: spacing.md },
  venueTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  venueName: { fontSize: 16, fontWeight: '700', color: colors.text, flex: 1 },
  venueRating: { fontSize: 13, color: colors.text },
  venueType: { fontSize: 12, color: colors.textMuted, marginBottom: spacing.sm },
  venueBottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm },
  venueLocation: { fontSize: 12, color: colors.textDim },
  venuePrice: { fontSize: 16, fontWeight: '800', color: colors.primary },
  venuePricePer: { fontSize: 11, color: colors.textMuted, fontWeight: '400' },
  venueTags: { flexDirection: 'row', gap: spacing.xs },
  tag: { backgroundColor: colors.border, borderRadius: radius.sm, paddingHorizontal: spacing.sm, paddingVertical: 2 },
  tagText: { color: colors.textMuted, fontSize: 11 },
});
