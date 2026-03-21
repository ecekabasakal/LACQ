export type RootStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  MainTabs: undefined;
  SpecialistDetail: { specialistId: string };
  AppointmentDetail: { appointment: object };
  BookAppointment: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Appointments: undefined;
  Discover: undefined;
  Profile: undefined;
};