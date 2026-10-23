import React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Switch
} from 'react-native';
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
        amount, setAmount,
        date, setDate,
        isScheduled, setIsScheduled,
        error,
        handleTransfer,
    } = useTransfer(navigation);

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <ScrollView
                contentContainerStyle={{ flexGrow: 1, paddingBottom: 40, paddingTop: 20 }}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                keyboardDismissMode="on-drag"
            >
                <View style={globalStyles.container}>

                    <View style={styles.formContainer}>
                        <Text style={styles.label}>Destinatario</Text>
                        <TextInput
                            style={globalStyles.input}
                            placeholder="Nombre o CBU/CVU"
                            value={recipient}
                            onChangeText={setRecipient}
                        />

                        <Text style={styles.label}>Monto a transferir</Text>
                        <TextInput
                            style={globalStyles.input}
                            placeholder="$0.00"
                            keyboardType="decimal-pad"
                            value={amount}
                            onChangeText={setAmount}
                        />

                        <View style={styles.switchContainer}>
                            <Text style={styles.switchLabel}>Programar para otra fecha</Text>
                            <Switch
                                value={isScheduled}
                                onValueChange={setIsScheduled}
                                trackColor={{ false: '#ddd', true: colors.primary }}
                            />
                        </View>

                        {isScheduled ? (
                            <View>
                                <Text style={styles.label}>Fecha de ejecución</Text>
                                <TextInput
                                    style={globalStyles.input}
                                    placeholder="DD/MM/AAAA"
                                    value={date}
                                    onChangeText={setDate}
                                />
                            </View>
                        ) : null}

                        {error ? <Text style={styles.errorText}>{error}</Text> : null}

                        <TouchableOpacity style={globalStyles.button} onPress={handleTransfer}>
                            <Text style={globalStyles.buttonText}>
                                {isScheduled ? 'Programar Transferencia' : 'Confirmar Transferencia'}
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};