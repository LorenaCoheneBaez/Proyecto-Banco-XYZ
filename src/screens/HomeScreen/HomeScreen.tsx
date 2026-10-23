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

            <View style={styles.actionsContainer}>
                <TouchableOpacity
                    style={globalStyles.button}
                    onPress={goToAddTransfer}
                >
                    <Text style={globalStyles.buttonText}>Realizar Transferencia</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[globalStyles.button, styles.secondaryButton]}
                    onPress={goToHistory}
                >
                    <Text style={globalStyles.buttonText}>Ver Movimientos</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};