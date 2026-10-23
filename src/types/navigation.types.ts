import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
    Login: undefined;
    Home: undefined;
    Transfer: undefined;
    History: undefined;
};

export type LoginNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;
export type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
export type TransferNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Transfer'>;
export type HistoryNavigationProp = NativeStackNavigationProp<RootStackParamList, 'History'>;
