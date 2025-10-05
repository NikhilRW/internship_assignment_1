import { StyleSheet, Platform } from 'react-native';
export const styles = StyleSheet.create({
  contentContainer: {
    padding: 16,
    backgroundColor: '#f6f6f6',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  inputLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: '#6b6b6b',
  },
  required: {
    color: 'red',
    marginLeft: 4,
    fontSize: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
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
  chipGreen: {
    backgroundColor: '#e6f9ef',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 100,
  },
  chipGreenText: {
    color: '#10b981',
    fontWeight: '700',
  },
  chipIndigo: {
    backgroundColor: '#e6f0ff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 100,
  },
  chipIndigoText: {
    color: '#6366f1',
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
    padding: 24,
  },
  modalCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
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
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listItemLabel: {
    color: '#111',
  },
  participantsChipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0e7ff',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    gap: 5,
  },
  chipText: {
    color: '#4f46e5',
    fontSize: 12,
  },
  chipImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  chipImagePlaceholder: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chipImagePlaceholderText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  participantOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    gap: 10,
  },
  selectedParticipantOption: {
    backgroundColor: '#e0e7ff',
    borderColor: '#4f46e5',
    borderRadius: 8,
  },
  participantOptionText: {
    flex: 1,
    color: '#111',
  },
  modalContent: {
    maxHeight: 300,
    marginTop: 10,
    marginBottom: 10,
  },
  modalDoneButton: {
    backgroundColor: '#7c3aed',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 24,
    alignSelf: 'center',
    marginTop: 10,
  },
  modalDoneButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

