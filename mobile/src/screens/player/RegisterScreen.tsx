import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { colors, spacing, radius } from '../../theme';

export default function RegisterScreen({ navigation }: any) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>← Back</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join thousands of players booking sessions daily</Text>
        </View>

        <View style={styles.form}>
          {[
            { label: 'Full Name', placeholder: 'Your full name', value: name, onChange: setName },
            { label: 'Email Address', placeholder: 'you@example.com', value: email, onChange: setEmail, type: 'email-address' },
            { label: 'Password', placeholder: '••••••••', value: password, onChange: setPassword, secure: true },
          ].map((field) => (
            <View key={field.label} style={styles.inputGroup}>
              <Text style={styles.label}>{field.label}</Text>
              <TextInput
                style={styles.input}
                placeholder={field.placeholder}
                placeholderTextColor={colors.textDim}
                keyboardType={(field.type as any) || 'default'}
                secureTextEntry={field.secure}
                value={field.value}
                onChangeText={field.onChange}
              />
            </View>
          ))}

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number</Text>
            <View style={styles.inputWrap}>
              <Text style={styles.inputPrefix}>🇧🇩 +880</Text>
              <TextInput
                style={styles.inputInner}
                placeholder="1XXXXXXXXX"
                placeholderTextColor={colors.textDim}
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
              />
            </View>
          </View>

          <Text style={styles.terms}>
            By creating an account you agree to our{' '}
            <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
            <Text style={styles.termsLink}>Privacy Policy</Text>.
          </Text>

          <TouchableOpacity
            style={styles.registerBtn}
            onPress={() => navigation.replace('Player')}
          >
            <Text style={styles.registerBtnText}>Create Account</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.loginLink}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.loginText}>
            Already have an account?{' '}
            <Text style={styles.loginHighlight}>Sign In</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  scroll: { flexGrow: 1, paddingHorizontal: spacing.lg, paddingTop: 60, paddingBottom: 40 },
  backBtn: { marginBottom: spacing.lg },
  backArrow: { color: colors.primary, fontSize: 15, fontWeight: '600' },
  header: { marginBottom: spacing.xl },
  title: { fontSize: 28, fontWeight: '800', color: colors.text, marginBottom: spacing.sm },
  subtitle: { fontSize: 14, color: colors.textMuted },
  form: { gap: spacing.md },
  inputGroup: { gap: spacing.xs },
  label: { fontSize: 13, color: colors.textMuted, fontWeight: '600' },
  input: {
    backgroundColor: colors.inputBg,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
    color: colors.text,
    fontSize: 15,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBg,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  inputPrefix: {
    paddingHorizontal: spacing.md,
    color: colors.textMuted,
    fontSize: 13,
    borderRightWidth: 1,
    borderRightColor: colors.border,
    paddingVertical: 14,
  },
  inputInner: { flex: 1, paddingHorizontal: spacing.md, paddingVertical: 14, color: colors.text, fontSize: 15 },
  terms: { fontSize: 12, color: colors.textDim, lineHeight: 18 },
  termsLink: { color: colors.primary },
  registerBtn: {
    backgroundColor: colors.primary,
    borderRadius: radius.full,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  registerBtnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  loginLink: { marginTop: spacing.xl, alignItems: 'center' },
  loginText: { color: colors.textMuted, fontSize: 14 },
  loginHighlight: { color: colors.primary, fontWeight: '700' },
});
