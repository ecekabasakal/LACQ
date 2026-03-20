export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  MainTabs: undefined;
  SpecialistDetail: { specialistId: string };
  AppointmentDetail: { appointment: object };
};

export type MainTabParamList = {
  Home: undefined;
  Appointments: undefined;
  Discover: undefined;
  Profile: undefined;
};