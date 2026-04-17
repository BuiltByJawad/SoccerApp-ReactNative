import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors, spacing, radius } from '../../theme';

const VENUE_DATA: Record<string, any> = {
  '1': {
    name: 'DBox Sports Complex',
    type: 'Outdoor Turf Ground 5v5',
    location: 'Plot 12, Gulshan-2, Dhaka',
    price: 250,
    rating: 4.8,
    totalReviews: 126,
    description: 'A premium outdoor turf facility with FIFA-approved synthetic grass, floodlights, and changing rooms. Perfect for evening and weekend sessions.',
    amenities: ['Changing Rooms', 'Floodlights', 'Parking', 'Water', 'First Aid', 'Referee'],
    slots: [
      { time: '6:00 AM', available: true, spotsLeft: 8 },
      { time: '8:00 AM', available: true, spotsLeft: 4 },
      { time: '10:00 AM', available: false, spotsLeft: 0 },
      { time: '4:00 PM', available: true, spotsLeft: 10 },
      { time: '6:00 PM', available: true, spotsLeft: 2 },
      { time: '8:00 PM', available: false, spotsLeft: 0 },
    ],
  },
};

export default function VenueDetailsScreen({ route, navigation }: any) {
  const { venueId } = route.params;
  const venue = VENUE_DATA[venueId] || VENUE_DATA['1'];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.banner}>
          <Text style={styles.bannerEmoji}>🏟️</Text>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareBtn}>
            <Text style={styles.shareIcon}>⋯</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.titleRow}>
            <View style={styles.titleLeft}>
              <Text style={styles.name}>{venue.name}</Text>
              <Text style={styles.type}>{venue.type}</Text>
            </View>
            <View style={styles.ratingBox}>
              <Text style={styles.ratingValue}>⭐ {venue.rating}</Text>
              <Text style={styles.ratingCount}>{venue.totalReviews} reviews</Text>
            </View>
          </View>

          <View style={styles.locationRow}>
            <Text style={styles.locationIcon}>📍</Text>
            <Text style={styles.location}>{venue.location}</Text>
          </View>

          <View style={styles.priceRow}>
            <View style={styles.priceBox}>
              <Text style={styles.priceLabel}>Per Person</Text>
              <Text style={styles.price}>BDT {venue.price}</Text>
            </View>
            <View style={styles.priceBox}>
              <Text style={styles.priceLabel}>Duration</Text>
              <Text style={styles.price}>90 Mins</Text>
            </View>
            <View style={styles.priceBox}>
              <Text style={styles.priceLabel}>Format</Text>
              <Text style={styles.price}>5v5</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.description}>{venue.description}</Text>

          <Text style={styles.sectionTitle}>Amenities</Text>
          <View style={styles.amenitiesGrid}>
            {venue.amenities.map((a: string) => (
              <View key={a} style={styles.amenityChip}>
                <Text style={styles.amenityText}>✓ {a}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Available Slots — Today</Text>
          <View style={styles.slotsGrid}>
            {venue.slots.map((slot: any) => (
              <TouchableOpacity
                key={slot.time}
                style={[styles.slotCard, !slot.available && styles.slotCardUnavailable]}
                disabled={!slot.available}
                onPress={() => navigation.navigate('BookSession', { venueId })}
              >
                <Text style={[styles.slotTime, !slot.available && styles.slotTimeUnavailable]}>
                  {slot.time}
                </Text>
                {slot.available ? (
                  <Text style={styles.slotSpots}>{slot.spotsLeft} spots</Text>
                ) : (
                  <Text style={styles.slotFull}>Full</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View>
          <Text style={styles.footerLabel}>Starting from</Text>
          <Text style={styles.footerPrice}>BDT {venue.price}<Text style={styles.footerPricePer}>/person</Text></Text>
        </View>
        <TouchableOpacity
          style={styles.bookBtn}
          onPress={() => navigation.navigate('BookSession', { venueId })}
        >
          <Text style={styles.bookBtnText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  banner: { height: 220, backgroundColor: colors.bgCard, alignItems: 'center', justifyContent: 'center' },
  bannerEmoji: { fontSize: 80 },
  backBtn: { position: 'absolute', top: 50, left: 16, width: 36, height: 36, borderRadius: 18, backgroundColor: colors.bg + 'CC', alignItems: 'center', justifyContent: 'center' },
  backIcon: { color: colors.text, fontSize: 18 },
  shareBtn: { position: 'absolute', top: 50, right: 16, width: 36, height: 36, borderRadius: 18, backgroundColor: colors.bg + 'CC', alignItems: 'center', justifyContent: 'center' },
  shareIcon: { color: colors.text, fontSize: 20, fontWeight: '800' },
  content: { padding: spacing.lg, paddingBottom: 100 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: spacing.sm },
  titleLeft: { flex: 1, marginRight: spacing.sm },
  name: { fontSize: 22, fontWeight: '800', color: colors.text, marginBottom: 4 },
  type: { fontSize: 13, color: colors.textMuted },
  ratingBox: { alignItems: 'center', backgroundColor: colors.bgCard, borderRadius: radius.md, padding: spacing.sm, borderWidth: 1, borderColor: colors.border },
  ratingValue: { fontSize: 16, fontWeight: '700', color: colors.text },
  ratingCount: { fontSize: 10, color: colors.textMuted },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.lg, gap: spacing.xs },
  locationIcon: { fontSize: 14 },
  location: { fontSize: 13, color: colors.textMuted },
  priceRow: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.lg },
  priceBox: { flex: 1, backgroundColor: colors.bgCard, borderRadius: radius.md, padding: spacing.md, borderWidth: 1, borderColor: colors.border, alignItems: 'center' },
  priceLabel: { fontSize: 10, color: colors.textMuted, marginBottom: 4 },
  price: { fontSize: 16, fontWeight: '700', color: colors.primary },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: colors.text, marginBottom: spacing.sm, marginTop: spacing.lg },
  description: { fontSize: 14, color: colors.textMuted, lineHeight: 22 },
  amenitiesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  amenityChip: { backgroundColor: colors.bgCard, borderRadius: radius.full, paddingHorizontal: spacing.md, paddingVertical: 6, borderWidth: 1, borderColor: colors.border },
  amenityText: { color: colors.text, fontSize: 12, fontWeight: '600' },
  slotsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  slotCard: { backgroundColor: colors.bgCard, borderRadius: radius.md, padding: spacing.md, width: '30%', alignItems: 'center', borderWidth: 1, borderColor: colors.primary + '44' },
  slotCardUnavailable: { backgroundColor: colors.bgCardAlt, borderColor: colors.border, opacity: 0.5 },
  slotTime: { fontSize: 14, fontWeight: '700', color: colors.text, marginBottom: 2 },
  slotTimeUnavailable: { color: colors.textDim },
  slotSpots: { fontSize: 11, color: colors.primary },
  slotFull: { fontSize: 11, color: colors.error },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: colors.bgCard, paddingHorizontal: spacing.lg, paddingVertical: spacing.md, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: colors.border },
  footerLabel: { fontSize: 11, color: colors.textMuted },
  footerPrice: { fontSize: 20, fontWeight: '800', color: colors.primary },
  footerPricePer: { fontSize: 12, color: colors.textMuted, fontWeight: '400' },
  bookBtn: { backgroundColor: colors.primary, borderRadius: radius.full, paddingHorizontal: spacing.xl, paddingVertical: 14 },
  bookBtnText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});
