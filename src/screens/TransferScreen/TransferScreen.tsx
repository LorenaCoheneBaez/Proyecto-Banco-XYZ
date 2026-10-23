import React from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Switch, ActivityIndicator } from 'react-native';
import { globalStyles } from '../../styles/theme.styles';
import { colors } from '../../styles/colors.styles';
import { styles } from './TranferScreen.styles';
import { useTransfer } from './useTransfer';
import { TransferNavigationProp } from '../../types/navigation.types';

interface TransferScreenProps {
    navigation: TransferNavigationProp;
}

export const TransferScreen = ({ navigation }: TransferScreenProps) => {
    const {
        recipient, setRecipient,
        amount,
        currency, setCurrency,
        date, setDate,
        isScheduled, setIsScheduled,
        error,
        handleTransfer,
        handleAmountChange,
        isLoading
    } = useTransfer(navigation);

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 40, paddingTop: 20 }} keyboardShouldPersistTaps="handled">
                <View style={globalStyles.container}>
                    <View style={styles.formContainer}>

                        <Text style={styles.label}>Destinatario (Nombre, CBU o Doc)</Text>
                        <TextInput
                            style={globalStyles.input}
                            placeholder="Ej: 13039930399 o Juan Perez"
                            value={recipient}
                            onChangeText={setRecipient}
                        />

                        {/* Selector de Moneda */}
                        <Text style={styles.label}>Moneda</Text>
                        <View style={{ flexDirection: 'row', gap: 10, marginBottom: 15 }}>
                            <TouchableOpacity
                                style={[globalStyles.button, { flex: 1, backgroundColor: currency === 'ARS' ? colors.primary : '#ccc' }]}
                                onPress={() => setCurrency('ARS')}
                            >
                                <Text style={globalStyles.buttonText}>ARS</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[globalStyles.button, { flex: 1, backgroundColor: currency === 'USD' ? colors.primary : '#ccc' }]}
                                onPress={() => setCurrency('USD')}
                            >
                                <Text style={globalStyles.buttonText}>USD</Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.label}>Monto a transferir</Text>
                        <TextInput
                            style={globalStyles.input}
                            placeholder="0,00"
                            keyboardType="decimal-pad"
                            value={amount}
                            onChangeText={handleAmountChange}
                        />

                        <View style={styles.switchContainer}>
                            <Text style={styles.switchLabel}>Programar para otra fecha</Text>
                            <Switch
                                value={isScheduled}
                                onValueChange={setIsScheduled}
                                trackColor={{ false: '#ddd', true: colors.primary }}
                            />
                        </View>

                        {isScheduled && (
                            <View>
                                <Text style={styles.label}>Fecha de ejecución</Text>
                                <TextInput
                                    style={globalStyles.input}
                                    placeholder="DD/MM/AAAA"
                                    value={date}
                                    onChangeText={setDate}
                                />
                            </View>
                        )}

                        {error ? <Text style={styles.errorText}>{error}</Text> : null}

                        <TouchableOpacity
                            style={[globalStyles.button, isLoading && { opacity: 0.7 }]}
                            onPress={handleTransfer}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <ActivityIndicator color="#ffffff" />
                            ) : (
                                <Text style={globalStyles.buttonText}>
                                    {isScheduled ? 'Programar Transferencia' : 'Confirmar Transferencia'}
                                </Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};