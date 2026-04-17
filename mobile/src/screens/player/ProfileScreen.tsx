import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors, spacing, radius } from '../../theme';

const MENU_ITEMS = [
  { icon: '📋', label: 'My Bookings', badge: '2' },
  { icon: '💳', label: 'Payment Methods' },
  { icon: '🔔', label: 'Notifications' },
  { icon: '⚙️', label: 'Settings' },
  { icon: '❓', label: 'Help & Support' },
  { icon: '📄', label: 'Terms & Privacy' },
];

export default function ProfileScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
        <TouchableOpacity>
          <Text style={styles.editBtn}>Edit ✏️</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileCard}>
          <View style={styles.avatarWrap}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>JD</Text>
            </View>
            <View style={styles.avatarBadge}>
              <Text style={styles.avatarBadgeText}>⚽</Text>
            </View>
          </View>
          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.phone}>+880 1712 345 678</Text>
          <Text style={styles.email}>john@example.com</Text>

          <View style={styles.statsRow}>
            {[
              { label: 'Sessions', value: '12' },
              { label: 'Venues', value: '4' },
              { label: 'Hours', value: '18h' },
            ].map((s) => (
              <View key={s.label} style={styles.statItem}>
                <Text style={styles.statValue}>{s.value}</Text>
                <Text style={styles.statLabel}>{s.label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.levelCard}>
          <View style={styles.levelLeft}>
            <Text style={styles.levelIcon}>🏆</Text>
            <View>
              <Text style={styles.levelTitle}>Gold Player</Text>
              <Text style={styles.levelSub}>480 / 500 XP to Platinum</Text>
            </View>
          </View>
          <Text style={styles.levelPct}>96%</Text>
        </View>
        <View style={styles.xpBar}>
          <View style={[styles.xpFill, { width: '96%' }]} />
        </View>

        <View style={styles.menuCard}>
          {MENU_ITEMS.map((item, i) => (
            <TouchableOpacity
              key={item.label}
              style={[styles.menuItem, i < MENU_ITEMS.length - 1 && styles.menuItemBorder]}
              onPress={() => {
                if (item.label === 'My Bookings') {
                  navigation.navigate('Bookings');
                }
              }}
            >
              <Text style={styles.menuIcon}>{item.icon}</Text>
              <Text style={styles.menuLabel}>{item.label}</Text>
              {item.badge && (
                <View style={styles.menuBadge}>
                  <Text style={styles.menuBadgeText}>{item.badge}</Text>
                </View>
              )}
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => navigation.replace('Auth')}
        >
          <Text style={styles.logoutText}>🚪  Sign Out</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingTop: 60, paddingBottom: spacing.md, backgroundColor: colors.bgCard, borderBottomWidth: 1, borderBottomColor: colors.border },
  title: { fontSize: 24, fontWeight: '800', color: colors.text },
  editBtn: { color: colors.primary, fontSize: 14, fontWeight: '600' },
  profileCard: { backgroundColor: colors.bgCard, margin: spacing.lg, borderRadius: radius.lg, padding: spacing.lg, alignItems: 'center', borderWidth: 1, borderColor: colors.border },
  avatarWrap: { position: 'relative', marginBottom: spacing.md },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: colors.primaryLight },
  avatarText: { fontSize: 28, fontWeight: '800', color: '#fff' },
  avatarBadge: { position: 'absolute', bottom: 0, right: 0, width: 26, height: 26, borderRadius: 13, backgroundColor: colors.bgCard, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: colors.border },
  avatarBadgeText: { fontSize: 14 },
  name: { fontSize: 20, fontWeight: '800', color: colors.text, marginBottom: 4 },
  phone: { fontSize: 13, color: colors.textMuted, marginBottom: 2 },
  email: { fontSize: 13, color: colors.textMuted, marginBottom: spacing.lg },
  statsRow: { flexDirection: 'row', width: '100%', borderTopWidth: 1, borderTopColor: colors.border, paddingTop: spacing.md },
  statItem: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: 20, fontWeight: '800', color: colors.primary },
  statLabel: { fontSize: 11, color: colors.textMuted, marginTop: 2 },
  levelCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: colors.bgCard, marginHorizontal: spacing.lg, borderRadius: radius.lg, padding: spacing.md, borderWidth: 1, borderColor: colors.border },
  levelLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  levelIcon: { fontSize: 28 },
  levelTitle: { fontSize: 15, fontWeight: '700', color: colors.text },
  levelSub: { fontSize: 11, color: colors.textMuted },
  levelPct: { fontSize: 18, fontWeight: '800', color: colors.primary },
  xpBar: { height: 6, backgroundColor: colors.border, borderRadius: 3, marginHorizontal: spacing.lg, marginTop: 6, marginBottom: spacing.lg, overflow: 'hidden' },
  xpFill: { height: '100%', backgroundColor: colors.primary, borderRadius: 3 },
  menuCard: { backgroundColor: colors.bgCard, marginHorizontal: spacing.lg, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, overflow: 'hidden', marginBottom: spacing.lg },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.md, paddingVertical: spacing.md, gap: spacing.sm },
  menuItemBorder: { borderBottomWidth: 1, borderBottomColor: colors.border },
  menuIcon: { fontSize: 18, width: 28 },
  menuLabel: { flex: 1, fontSize: 14, color: colors.text, fontWeight: '500' },
  menuBadge: { backgroundColor: colors.primary, borderRadius: radius.full, width: 20, height: 20, alignItems: 'center', justifyContent: 'center' },
  menuBadgeText: { color: '#fff', fontSize: 11, fontWeight: '700' },
  menuArrow: { color: colors.textDim, fontSize: 20 },
  logoutBtn: { marginHorizontal: spacing.lg, backgroundColor: colors.error + '22', borderRadius: radius.full, paddingVertical: 14, alignItems: 'center', borderWidth: 1, borderColor: colors.error + '44' },
  logoutText: { color: colors.error, fontWeight: '700', fontSize: 14 },
});
