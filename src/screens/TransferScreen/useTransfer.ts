import { useState } from 'react';
import { Alert } from 'react-native';
import { useBank } from '../../context/BankContext';
import { TransferNavigationProp } from '../../types/navigation.types';
import { getTodayArg, getTomorrowArg, parseArgDate, isValidArgDate } from '../../utils/date.utils';
import { normalizeAmountInput, formatCurrencyARS } from '../../utils/currency.utils';

export const useTransfer = (navigation: TransferNavigationProp) => {
    const { balance, addTransfer } = useBank();

    const [recipient, setRecipient] = useState<string>('');
    const [amount, setAmount] = useState<string>('');

    const today = getTodayArg(); // "22/10/2026"
    const [date, setDate] = useState<string>(getTomorrowArg());

    const [isScheduled, setIsScheduled] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    // Borra el error al cambiar el estado del switch
    const handleToggleScheduled = (value: boolean) => {
        setIsScheduled(value);
        setError('');
    };

    const handleAmountChange = (text: string) => {
        setAmount(normalizeAmountInput(text));
    };

    const handleTransfer = () => {
        if (!recipient.trim()) {
            setError('El destinatario es obligatorio.');
            return;
        }

        const numericAmount = parseFloat(amount.replace(',', '.'));

        if (isNaN(numericAmount) || numericAmount <= 0) {
            setError('El monto debe ser mayor a 0.');
            return;
        }

        if (numericAmount > balance) {
            setError(`Saldo insuficiente. Disponible: ${formatCurrencyARS(balance)}`);
            return;
        }

        setError('');

        const finalDate = isScheduled ? date : today;

        if (isScheduled) {
            if (!isValidArgDate(finalDate)) {
                return setError('Formato de fecha inválido. Use DD/MM/AAAA.');
            }
            const selectedDateObj = parseArgDate(finalDate);
            const currentDateObj = parseArgDate(today);

            if (selectedDateObj <= currentDateObj) {
                return setError('No puede programar transferencias para hoy, ni fechas pasadas.');
            }
        }

        addTransfer({ recipient, amount: numericAmount, date: finalDate });

        const message =
            finalDate === today
                ? 'Transferencia realizada con éxito.'
                : `Transferencia programada para el ${finalDate}.`;

        Alert.alert('Operación Exitosa', message, [
            { text: 'OK', onPress: () => navigation.goBack() },
        ]);
    };

    return {
        recipient,
        setRecipient,
        amount,
        setAmount,
        date,
        setDate,
        isScheduled,
        setIsScheduled: handleToggleScheduled,
        error,
        handleTransfer,
        handleAmountChange,
    };
};
