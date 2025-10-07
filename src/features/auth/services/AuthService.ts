import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  signInWithCredential,
  GoogleAuthProvider,
  updateProfile,
} from '@react-native-firebase/auth';
import { useAuthStore } from 'shared/store/useAuthStore';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GOOGLE_AUTH_CLIENT_ID } from '@env';
import {
  doc,
  getDoc,
  getFirestore,
  setDoc,
} from '@react-native-firebase/firestore';

class AuthService {
  private auth = getAuth();

  constructor() {
    GoogleSignin.configure({
      webClientId: GOOGLE_AUTH_CLIENT_ID,
    });
    console.log('GOOGLE_AUTH_CLIENT_ID', GOOGLE_AUTH_CLIENT_ID);
  }

  async signInWithEmailAndPassword(
    email: string,
    password: string,
    displayName?: string,
    photoURL?: string,
  ) {
    const userCredential = await signInWithEmailAndPassword(
      this.auth,
      email,
      password,
    );
    if (displayName || photoURL) {
      await this.updateUserProfile(displayName, photoURL);
    }

    await this.ensureUserInFirestore(userCredential.user);

    useAuthStore.getState().setUser(userCredential.user);
    return userCredential;
  }

  async googleSignIn() {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const userInfo = await GoogleSignin.signIn();
    const { accessToken } = await GoogleSignin.getTokens();
    if (!accessToken) {
      throw new Error('No access token found');
    }
    const googleCredential = GoogleAuthProvider.credential(null, accessToken);
    const userCredential = await signInWithCredential(
      this.auth,
      googleCredential,
    );
    // Update profile with Google info
    if (userInfo.data?.user) {
      await this.updateUserProfile(
        userInfo.data.user.name!,
        userInfo.data.user.photo!,
      );
      useAuthStore.getState().setUser(userCredential.user);
    }

    await this.ensureUserInFirestore(userCredential.user);
    return userCredential;
  }

  async signOut() {
    if (GoogleSignin.hasPreviousSignIn()) {
      GoogleSignin.signOut();
    }
    await signOut(this.auth);
    useAuthStore.getState().clearUser();
  }

  async updateUserProfile(displayName?: string, photoURL?: string) {
    const currentUser = this.auth.currentUser;
    if (currentUser && (displayName || photoURL)) {
      await updateProfile(currentUser, {
        displayName: displayName || currentUser.displayName,
        photoURL: photoURL || currentUser.photoURL,
      });
    }
  }

  private async ensureUserInFirestore(user: User) {
    const firestore = getFirestore();
    const userDocRef = doc(firestore, 'users', user.uid);
    const userDoc = await getDoc(userDocRef);
    if (!userDoc.exists()) {
      await setDoc(userDocRef, {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        createdAt: new Date(),
      });
    }
  }
}

export default new AuthService();
