import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors, spacing, radius } from '../../theme';

export default function CheckoutScreen({ navigation }: any) {
  const [paymentMode, setPaymentMode] = useState<'full' | 'split'>('split');
  const [method, setMethod] = useState('bkash');

  const PAYMENT_METHODS = [
    { id: 'bkash', label: 'bKash', icon: '💳' },
    { id: 'nagad', label: 'Nagad', icon: '📱' },
    { id: 'card', label: 'Card', icon: '🏦' },
    { id: 'cash', label: 'Cash', icon: '💵' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Checkout</Text>
        <View style={{ width: 50 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.sessionCard}>
          <View style={styles.sessionCardLeft}>
            <Text style={styles.sessionName}>Sunday Fun Day, 05 July</Text>
            <Text style={styles.sessionSub}>Morning Session</Text>
            <Text style={styles.sessionDetail}>Outdoor Turf Ground 5v5</Text>
            <Text style={styles.sessionDetail}>DBox Sports Complex</Text>
          </View>
          <View style={styles.sessionCardRight}>
            <Text style={styles.sessionEmoji}>⚽</Text>
            <Text style={styles.sessionDuration}>90 Mins</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Payment Mode</Text>
        <View style={styles.modeRow}>
          <TouchableOpacity
            style={[styles.modeCard, paymentMode === 'full' && styles.modeCardActive]}
            onPress={() => setPaymentMode('full')}
          >
            <Text style={styles.modeIcon}>💰</Text>
            <Text style={styles.modeLabel}>Full Payment</Text>
            <Text style={styles.modeAmount}>BDT 500</Text>
            <Text style={styles.modeDesc}>Pay for the full session</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modeCard, paymentMode === 'split' && styles.modeCardActive]}
            onPress={() => setPaymentMode('split')}
          >
            <Text style={styles.modeIcon}>🤝</Text>
            <Text style={styles.modeLabel}>Split Payment</Text>
            <Text style={[styles.modeAmount, { color: colors.purple }]}>BDT 250</Text>
            <Text style={styles.modeDesc}>Pay your share only</Text>
          </TouchableOpacity>
        </View>

        {paymentMode === 'split' && (
          <View style={styles.splitNote}>
            <Text style={styles.splitNoteText}>
              ✅ 100% refund guaranteed if teammates don't pay 12 hours before the session.
            </Text>
          </View>
        )}

        <Text style={styles.sectionTitle}>Payment Method</Text>
        <View style={styles.methodList}>
          {PAYMENT_METHODS.map((m) => (
            <TouchableOpacity
              key={m.id}
              style={[styles.methodCard, method === m.id && styles.methodCardActive]}
              onPress={() => setMethod(m.id)}
            >
              <Text style={styles.methodIcon}>{m.icon}</Text>
              <Text style={[styles.methodLabel, method === m.id && styles.methodLabelActive]}>
                {m.label}
              </Text>
              {method === m.id && (
                <View style={styles.methodCheck}>
                  <Text style={styles.methodCheckText}>✓</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.policyCard}>
          <View style={styles.policyHeader}>
            <Text style={styles.policyIcon}>📋</Text>
            <Text style={styles.policyTitle}>Cancellation Policy</Text>
          </View>
          <View style={styles.policyDivider} />
          <View style={styles.policyRow}>
            <Text style={styles.policyCheck}>✔</Text>
            <Text style={styles.policyText}>Cancel 24+ hours before: Full refund</Text>
          </View>
          <View style={styles.policyRow}>
            <Text style={styles.policyRefresh}>🔁</Text>
            <Text style={styles.policyText}>Cancel 12–24 hours before: 50% refund</Text>
          </View>
          <View style={styles.policyNote}>
            <Text style={styles.policyNoteText}>
              Service fees are non-refundable. Refunds processed within 2 business days.
            </Text>
          </View>
          <View style={styles.cancelAlert}>
            <Text style={styles.cancelAlertText}>Cancel anytime up to 24 hrs before for a full refund.</Text>
          </View>
        </View>

        <View style={styles.orderSummary}>
          <Text style={styles.orderTitle}>Order Summary</Text>
          <View style={styles.orderRow}>
            <Text style={styles.orderLabel}>Session Fee</Text>
            <Text style={styles.orderValue}>BDT 500</Text>
          </View>
          <View style={styles.orderRow}>
            <Text style={styles.orderLabel}>Your Share</Text>
            <Text style={styles.orderValue}>BDT {paymentMode === 'split' ? 250 : 500}</Text>
          </View>
          <View style={styles.orderRow}>
            <Text style={styles.orderLabel}>Service Fee</Text>
            <Text style={styles.orderValue}>BDT 25</Text>
          </View>
          <View style={styles.orderDivider} />
          <View style={styles.orderRow}>
            <Text style={styles.orderTotal}>Total</Text>
            <Text style={styles.orderTotalValue}>BDT {paymentMode === 'split' ? 275 : 525}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.payBtn}
          onPress={() => navigation.replace('Confirmation', { bookingId: 'BK001' })}
        >
          <Text style={styles.payBtnText}>
            Proceed to Pay — BDT {paymentMode === 'split' ? 275 : 525}
          </Text>
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
  sessionCard: { backgroundColor: colors.bgCard, borderRadius: radius.lg, padding: spacing.md, flexDirection: 'row', justifyContent: 'space-between', borderWidth: 1, borderColor: colors.border, marginBottom: spacing.md },
  sessionCardLeft: { flex: 1 },
  sessionName: { fontSize: 15, fontWeight: '700', color: colors.text, marginBottom: 4 },
  sessionSub: { fontSize: 12, color: colors.primary, marginBottom: 6 },
  sessionDetail: { fontSize: 12, color: colors.textMuted, marginBottom: 2 },
  sessionCardRight: { alignItems: 'center', justifyContent: 'center', paddingLeft: spacing.md, borderLeftWidth: 1, borderLeftColor: colors.border },
  sessionEmoji: { fontSize: 32, marginBottom: 4 },
  sessionDuration: { fontSize: 12, color: colors.textMuted },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: colors.text, marginBottom: spacing.md, marginTop: spacing.lg },
  modeRow: { flexDirection: 'row', gap: spacing.sm },
  modeCard: { flex: 1, backgroundColor: colors.bgCard, borderRadius: radius.lg, padding: spacing.md, alignItems: 'center', borderWidth: 1, borderColor: colors.border, gap: 4 },
  modeCardActive: { borderColor: colors.primary, backgroundColor: colors.primary + '11' },
  modeIcon: { fontSize: 24 },
  modeLabel: { fontSize: 13, fontWeight: '700', color: colors.text },
  modeAmount: { fontSize: 18, fontWeight: '800', color: colors.primary },
  modeDesc: { fontSize: 10, color: colors.textMuted, textAlign: 'center' },
  splitNote: { backgroundColor: '#00C853' + '22', borderRadius: radius.md, padding: spacing.md, borderWidth: 1, borderColor: '#00C853' + '44', marginTop: spacing.sm },
  splitNoteText: { color: '#00C853', fontSize: 13, lineHeight: 18 },
  methodList: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  methodCard: { backgroundColor: colors.bgCard, borderRadius: radius.md, padding: spacing.md, alignItems: 'center', borderWidth: 1, borderColor: colors.border, width: '47%' },
  methodCardActive: { borderColor: colors.primary },
  methodIcon: { fontSize: 24, marginBottom: 4 },
  methodLabel: { fontSize: 13, fontWeight: '600', color: colors.textMuted },
  methodLabelActive: { color: colors.text },
  methodCheck: { position: 'absolute', top: 8, right: 8, width: 18, height: 18, borderRadius: 9, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  methodCheckText: { color: '#fff', fontSize: 10, fontWeight: '700' },
  policyCard: { backgroundColor: colors.bgCard, borderRadius: radius.lg, padding: spacing.md, borderWidth: 1, borderColor: colors.border, marginTop: spacing.lg },
  policyHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.sm },
  policyIcon: { fontSize: 16 },
  policyTitle: { fontSize: 14, fontWeight: '700', color: colors.text },
  policyDivider: { height: 1, backgroundColor: colors.border, marginBottom: spacing.sm },
  policyRow: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.xs, marginBottom: spacing.sm },
  policyCheck: { fontSize: 12, color: colors.primary },
  policyRefresh: { fontSize: 12 },
  policyText: { fontSize: 12, color: colors.textMuted, flex: 1 },
  policyNote: { backgroundColor: colors.inputBg, borderRadius: radius.sm, padding: spacing.sm, marginBottom: spacing.sm },
  policyNoteText: { fontSize: 11, color: colors.textDim, textAlign: 'center' },
  cancelAlert: { backgroundColor: colors.error + '22', borderRadius: radius.sm, padding: spacing.sm },
  cancelAlertText: { fontSize: 11, color: colors.error, textAlign: 'center' },
  orderSummary: { backgroundColor: colors.bgCard, borderRadius: radius.lg, padding: spacing.md, borderWidth: 1, borderColor: colors.border, marginTop: spacing.lg, gap: spacing.sm },
  orderTitle: { fontSize: 15, fontWeight: '700', color: colors.text, marginBottom: spacing.sm },
  orderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  orderLabel: { fontSize: 13, color: colors.textMuted },
  orderValue: { fontSize: 13, color: colors.text, fontWeight: '600' },
  orderDivider: { height: 1, backgroundColor: colors.border },
  orderTotal: { fontSize: 15, fontWeight: '700', color: colors.text },
  orderTotalValue: { fontSize: 20, fontWeight: '800', color: colors.primary },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: colors.bgCard, padding: spacing.lg, borderTopWidth: 1, borderTopColor: colors.border },
  payBtn: { backgroundColor: colors.purple, borderRadius: radius.full, paddingVertical: 16, alignItems: 'center' },
  payBtnText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});
