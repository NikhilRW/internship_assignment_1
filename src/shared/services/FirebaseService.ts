import firestore, {
  addDoc,
  collection,
  doc,
  getFirestore,
  serverTimestamp,
  updateDoc,
} from '@react-native-firebase/firestore';


export type MeetingData = {
  title: string;
  dateTime: string;
  meetingType: 'online' | 'offline';
  link?: string;
  reminder: 'none' | '15-minutes' | '30-minutes' | '1-hour' | string;
  participants: string[];
}
// Function to create a new meeting
export const createMeeting = async (meetingData: MeetingData) => {
  try {
    const docRef = await addDoc(collection(getFirestore(), 'meetings'), {
      ...meetingData,
      createdAt: serverTimestamp(), // Add a server timestamp
    });
    console.log('Meeting created with ID: ', docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error creating meeting: ', error);
    return { success: false, error };
  }
};

// Function to update an existing meeting
export const updateMeeting = async (meetingId: string, meetingData: any) => {
  try {
    await updateDoc(doc(collection(getFirestore(), 'meetings'), meetingId), {
      ...meetingData,
      updatedAt: firestore.FieldValue.serverTimestamp(), // Update timestamp
    });
    console.log('Meeting updated successfully');
    return { success: true };
  } catch (error) {
    console.error('Error updating meeting: ', error);
    return { success: false, error };
  }
};

// You can add more Firebase related functions here, e.g., getMeetings, deleteMeeting, etc.
