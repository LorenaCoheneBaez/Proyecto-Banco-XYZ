import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './BalanceCard.styles';
import { useBalanceCard } from './useBalanceCard';
import { formatCurrencyARS } from '../../utils/currency.utils';

export const BalanceCard = () => {
    const { balance } = useBalanceCard();

    return (
        <View style={styles.card}>
            <Text style={styles.label}>Saldo Disponible</Text>
            <Text style={styles.balance}>{formatCurrencyARS(balance)}</Text>
        </View>
    );
};