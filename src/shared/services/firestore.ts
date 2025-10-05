import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

export const db = (): FirebaseFirestoreTypes.Module => firestore();
export const meetingsCollection = () => db().collection('meetings');
export const usersCollection = () => db().collection('users');

export default firestore;
