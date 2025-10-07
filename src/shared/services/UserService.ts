import { getFirestore } from "@react-native-firebase/firestore";

export type UserPayload = {
  uid: string;
  name: string;
  email: string;
};

export default class UserService {
  static async createUser(user: UserPayload) {
    await getFirestore().collection('users').doc(user.uid).set({
      name: user.name,
      email: user.email,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }
  static async getUsers() {
    const snapshot = await getFirestore().collection('users').get();
    return snapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() })) as UserPayload[];
  }
}
