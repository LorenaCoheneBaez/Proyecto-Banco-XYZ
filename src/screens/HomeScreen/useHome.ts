import { HomeNavigationProp } from '../../types/navigation.types';

export const useHome = (navigation: HomeNavigationProp) => {
    const goToAddTransfer = () => {
        navigation.navigate('Transfer');
    };

    const goToHistory = () => {
        navigation.navigate('History');
    };

    return { goToAddTransfer, goToHistory };
};
