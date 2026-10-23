import { useCallback, useLayoutEffect } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useBank } from '../../context/BankContext';
import {styles} from './HomeScreen.styles'
import { Ionicons } from '@expo/vector-icons';
import { globalStyles } from '../../styles/theme.styles';
import { colors } from '../../styles/colors.styles';
import { useHome } from './useHome';
import { BalanceCard } from '../../components/BalanceCard/BalanceCard';
import { HomeNavigationProp } from '../../types/navigation.types';

interface HomeScreenProps {
    navigation: HomeNavigationProp;
}

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
    const { goToAddTransfer, goToHistory, handleLogout } = useHome(navigation);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={handleLogout} style={{ padding: 8 }}>
                    <Ionicons name="log-out-outline" size={24} color={colors.danger} />
                </TouchableOpacity>
            ),
        });
    }, [navigation, handleLogout]);

    const { refreshData, isLoading } = useBank();

    useFocusEffect(
        useCallback(() => {
            refreshData();
        }, [refreshData])
    );

    return (
        <View style={globalStyles.container}>
            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
            <BalanceCard />
            )}

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