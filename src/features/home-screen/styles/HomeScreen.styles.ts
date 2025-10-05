import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  cta: {
    backgroundColor: '#7c3aed',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  ctaText: {
    color: '#fff',
  },
  errorText: {
    color: 'red',
    marginTop: 20,
    textAlign: 'center',
  },
  noMeetingsText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#555',
  },
  meetingList: {
    width: '100%',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  meetingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  meetingItemContent: {
    flex: 1,
  },
  meetingItemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  meetingItemDate: {
    fontSize: 14,
    color: '#555',
    marginBottom: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  meetingItemTime: {
    fontSize: 14,
    color: '#555',
    marginBottom: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  meetingItemParticipants: {
    fontSize: 14,
    color: '#555',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

