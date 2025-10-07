import { Platform, StyleSheet } from 'react-native';
import { lightTheme } from 'shared/theme/Theme';

export const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    width: '80%',
    backgroundColor: lightTheme.colors.background,
    borderRadius: 8,
    padding: 16,
  },
  selectedParticipantOption: {
    backgroundColor: '#e0d7fe',
    borderColor: '#7c3aed',
    borderWidth: 1,
    padding: 8,
  },
  selectedParticipantOptionText: {
    color: '#7c3aed',
    fontWeight: '600',
  },
  noUsersText: {
    textAlign: 'center',
    color: lightTheme.colors.text,
  },
  participantsScrollView: {
    marginBottom: 15,
    marginTop: 15,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: lightTheme.colors.text,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    minHeight: 40,
    borderWidth: 1,
    borderColor: lightTheme.colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    color: lightTheme.colors.text,
    backgroundColor: lightTheme.colors.inputBackground,
  },
  inputError: {
    borderColor: '#ff0000',
  },
  inputText: {
    marginVertical: 'auto',
  },
  addButton: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#7c3aed',
    borderRadius: 6,
  },
  participantItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: lightTheme.colors.border,
  },
  participantEmail: {
    fontSize: 16,
    color: lightTheme.colors.text,
    flex: 1,
    marginRight: 8,
  },
  listItem: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: lightTheme.colors.border,
  },
  listItemLabel: {
    fontSize: 16,
    color: lightTheme.colors.text,
  },
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
  },
  primaryButtonDisabled: {
    backgroundColor: '#d1c4f6',
  },
  primaryButtonText: {
    color: '#fff',
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
  },
  modalDoneButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  datePickerHeader: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5ea',
    justifyContent: 'center',
    alignItems: 'center',
  },
  datePickerWeekday: {
    color: 'rgb(41 41 41)',
  },
  datePickerSeparator: {
    width: '100%',
    backgroundColor: '#e5e5ea',
    borderRadius: 0,
    padding: 0,
    height: 1,
  },
  datePickerFooter: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e5ea',
    justifyContent: 'center',
  },
  datePickerDoneButton: {
    backgroundColor: '#7c3aed',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 24,
  },
  datePickerDoneButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  dateTimePickerContainer: {
    paddingHorizontal: 12,
    paddingVertical: 15,
    minHeight: 320,
  },
  timePickerContainer: {
    height: 200,
    justifyContent: 'flex-start',
  },
  participantsText: {
    marginVertical: 'auto',
  },
  participantsTextSelected: {
    color: '#111',
  },
  participantsTextEmpty: {
    color: '#a3a3a3',
  },
  participantsContainer: {
    marginTop: 10,
    flexWrap: 'wrap',
  },
  toggleButtonActive: {
    borderColor: '#7c3aed',
    backgroundColor: 'rgba(124,58,237,0.08)',
  },
  toggleButtonInactive: {
    borderColor: '#e5e5ea',
    backgroundColor: '#fff',
  },
  toggleTextActive: {
    color: '#7c3aed',
  },
  toggleTextInactive: {
    color: '#111',
  },
});
