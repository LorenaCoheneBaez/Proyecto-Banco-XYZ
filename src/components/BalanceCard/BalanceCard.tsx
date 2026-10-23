import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { styles } from './BalanceCard.styles';
import { useBalanceCard } from './useBalanceCard';

export const BalanceCard = () => {
    const { formattedBalance, balanceCurrency, isLoading } = useBalanceCard();

    if (isLoading) {
        return (
            <View style={styles.card}>
                <ActivityIndicator size="large" color="#ffffff" />
            </View>
        );
    }

    return (
        <View style={styles.card}>
            <Text style={styles.label}>Saldo Disponible</Text>
            <Text style={styles.balance}>{formattedBalance}</Text>

            {/* Etiqueta explícita de la moneda */}
            <View style={{ backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, alignSelf: 'flex-start', marginTop: 8 }}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>
                    Cuenta en {balanceCurrency}
                </Text>
            </View>
        </View>
    );
};