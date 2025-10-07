import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f6f6f6',
    justifyContent: 'center',
    alignItems: 'center',
    width:'100%',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
  },
  googleButton: {
    backgroundColor: '#111827',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  googleText: {
    color: '#fff',
    fontWeight: '600',
  },
  googleLogo: {
    width: 30,
    height: 30,
  },
  dividerText: {
    color: '#6b6b6b',
    marginVertical: 8,
    textAlign: 'center',
  },
  fieldContainer: {
    marginBottom: 12,
    width:'90%',

  },
  fieldLabel: {
    marginBottom: 6,
    color: '#6b6b6b',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e5e5ea',
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 12 : 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    color: '#111',
  },
  errorText: {
    color: '#ef4444',
    marginTop: 4,
  },
  submitButton: {
    backgroundColor: '#7c3aed',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  submitText: {
    color: '#fff',
    fontWeight: '600',
  },
  footerRow: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 16,
    justifyContent: 'center',
  },
  footerMuted: {
    color: '#6b6b6b',
  },
  footerLink: {
    color: '#7c3aed',
    fontWeight: '600',
  },
});
