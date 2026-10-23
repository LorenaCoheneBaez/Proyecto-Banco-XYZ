import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { globalStyles } from '../../styles/theme.styles';
import { styles } from './HomeScreen.styles';
import { useHome } from './useHome';
import { BalanceCard } from '../../components/BalanceCard/BalanceCard';
import { HomeNavigationProp } from '../../types/navigation.types';

interface HomeScreenProps {
    navigation: HomeNavigationProp;
}

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
    const { goToAddTransfer, goToHistory } = useHome(navigation);

    return (
        <View style={globalStyles.container}>
            <BalanceCard />
        </View>
    );
};