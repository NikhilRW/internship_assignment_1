import { db } from '../../../shared/services/firestore';

export type UserPayload = {
  uid: string;
  name: string;
  email: string;
};

export default class UserService {
  static async createUser(user: UserPayload) {
    await db().collection('users').doc(user.uid).set({
      name: user.name,
      email: user.email,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }
  static async getUsers() {
    const snapshot = await db().collection('users').get();
    return snapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() }));
  }
}
