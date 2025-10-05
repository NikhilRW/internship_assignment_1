import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  contentContainer: {
    padding: 16,
    backgroundColor: '#f6f6f6',
  },
  fieldContainer: {
    marginBottom: 16,
  },
  errorText: {
    color: '#f00',
    fontSize: 12,
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: '#6b6b6b',
    marginBottom: 8,
  },
  inputLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  required: {
    color: '#f00',
    fontSize: 12,
  },
  gap12: {
    gap: 12,
  },
  gap8: {
    gap: 8,
  },
  flex1: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e5e5ea',
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
    borderRadius: 10,
    backgroundColor: '#fff',
    color: '#111',
  },
  dateTimeField: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderWidth: 1,
    borderColor: '#e5e5ea',
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  dateTimeFieldTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  dateTimeFieldText: {
    color: '#111',
    fontSize: 14,
  },
  separator: {
    color: '#e5e5ea',
    fontSize: 20,
    marginHorizontal: 8,
  },
  notesInput: {
    minHeight: 90,
    textAlignVertical: 'top',
  },
  toggleButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: '#fff',
  },
  addButton: {
    backgroundColor: '#7c3aed',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  chip: {
    backgroundColor: '#eef2ff',
    borderRadius: 100,
  },
  chipImage: {
    borderRadius: 22,
  },
  chipImagePlaceholder: {
    borderRadius: 12,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chipImagePlaceholderText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  chipText: {
    color: '#7c3aed',
    fontWeight: '700',
  },
  primaryButton: {
    backgroundColor: '#7c3aed',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  primaryButtonDisabled: {
    backgroundColor: '#d1c4f6',
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalCard: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 16,
    overflow: 'hidden',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  modalSubtle: {
    color: '#6b6b6b',
    marginBottom: 16,
  },
  modalActions: {
    justifyContent: 'flex-end',
    gap: 12,
  },
  textButton: {
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  filledButton: {
    backgroundColor: '#7c3aed',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  filledButtonText: {
    color: '#fff',
  },
  listItem: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 8,
    marginBottom: 4,
  },

  participantOption: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#e5e5ea',
    borderRadius: 10,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  participantOptionText: {
    color: '#111',
    fontSize: 14,
    fontWeight: '500',
  },
  modalDoneButton: {
    backgroundColor: '#7c3aed',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 24,
    alignSelf: 'center',
    marginTop: 12,
  },
  modalDoneButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  listItemLabel: {
    color: '#111',
  },
});
