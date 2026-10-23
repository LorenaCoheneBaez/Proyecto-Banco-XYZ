import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './BalanceCard.styles';
import { useBalanceCard } from './useBalanceCard';

export const BalanceCard = () => {
    const { formattedBalance } = useBalanceCard();

    return (
        <View style={styles.card}>
            <Text style={styles.label}>Saldo Disponible</Text>
            <Text style={styles.balance}>{formattedBalance}</Text>
        </View>
    );
};