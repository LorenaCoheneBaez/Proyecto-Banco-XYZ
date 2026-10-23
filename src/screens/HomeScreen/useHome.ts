import { Alert } from 'react-native';
import { HomeNavigationProp } from '../../types/navigation.types';

export const useHome = (navigation: HomeNavigationProp) => {
    const goToAddTransfer = () => {
        navigation.navigate('Transfer');
    };

    const goToHistory = () => {
        navigation.navigate('History');
    };

    const handleLogout = () => {
        Alert.alert('Cerrar Sesión', '¿Estás seguro que deseas salir de tu cuenta?', [
            { text: 'Cancelar', style: 'cancel' },
            {
                text: 'Salir',
                style: 'destructive',
                onPress: () => navigation.replace('Login'),
            },
        ]);
    };

    return { goToAddTransfer, goToHistory, handleLogout };
};
