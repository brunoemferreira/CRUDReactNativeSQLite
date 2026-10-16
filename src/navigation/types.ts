import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  HomeScreen: undefined;
  Register: undefined;
  Update: undefined;
  View: undefined;
  ViewAll: undefined;
  Delete: undefined;
  About: undefined;
};

export type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'HomeScreen'>;
export type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Register'>;
export type UpdateScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Update'>;
export type ViewScreenNavigationProp = StackNavigationProp<RootStackParamList, 'View'>;
export type ViewAllScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ViewAll'>;
export type DeleteScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Delete'>;
export type AboutScreenNavigationProp = StackNavigationProp<RootStackParamList, 'About'>;
