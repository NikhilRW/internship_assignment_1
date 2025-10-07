export type RootStackParamList = {
  CreateMeeting: undefined;
  UpdateMeeting: { meetingId: string; isOwner: boolean };
  HomeScreen: undefined;
  Auth: undefined;
};
export type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};
