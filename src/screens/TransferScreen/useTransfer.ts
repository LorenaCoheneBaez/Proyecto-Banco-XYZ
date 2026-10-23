import { useState} from 'react';
import { Alert } from 'react-native';
import { useBank } from '../../context/BankContext';
import { TransferNavigationProp } from '../../types/navigation.types';
import { getTodayArg, getTomorrowArg, parseArgDate, isValidArgDate } from '../../utils/date.utils';
import { normalizeAmountInput, formatCurrencyARS } from '../../utils/currency.utils';
import { apiService } from '../../services/api.service';

export const useTransfer = (navigation: TransferNavigationProp) => {
    const { balance, balanceCurrency, token, refreshData } = useBank();

    const [recipient, setRecipient] = useState<string>('');
    const [amount, setAmount] = useState<string>('');

    const [currency, setCurrency] = useState<string>(balanceCurrency || 'ARS');
    const [prevBalanceCurrency, setPrevBalanceCurrency] = useState<string>(
        balanceCurrency || 'ARS',
    );

    if (balanceCurrency && balanceCurrency !== prevBalanceCurrency) {
        setCurrency(balanceCurrency);
        setPrevBalanceCurrency(balanceCurrency);
    }

    const today = getTodayArg();
    const [date, setDate] = useState<string>(getTomorrowArg());
    const [isScheduled, setIsScheduled] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleToggleScheduled = (value: boolean) => {
        setIsScheduled(value);
        setError('');
    };

    const handleAmountChange = (text: string) => {
        setAmount(normalizeAmountInput(text));
    };

    const handleTransfer = async () => {
        if (!recipient.trim()) {
            return setError('El destinatario (Nombre, CBU o Documento) es obligatorio.');
        }

        const numericAmount = parseFloat(amount.replace(',', '.'));

        if (isNaN(numericAmount) || numericAmount <= 0) {
            return setError('El monto debe ser mayor a 0.');
        }

        if (currency !== balanceCurrency) {
            return setError(`Operación inválida. Tu cuenta opera en ${balanceCurrency}.`);
        }

        if (numericAmount > balance) {
            return setError(
                `Saldo insuficiente. Disponible: ${formatCurrencyARS(balance, balanceCurrency)}`,
            );
        }

        setError('');
        const finalDate = isScheduled ? date : today;

        if (isScheduled) {
            if (!isValidArgDate(finalDate)) {
                return setError('Formato de fecha inválido. Use DD/MM/AAAA.');
            }
            if (parseArgDate(finalDate) <= parseArgDate(today)) {
                return setError(
                    'No puede programar transferencias para fechas pasadas o para hoy.',
                );
            }
        }

        if (!token) return setError('Error de autenticación.');

        setIsLoading(true);
        try {
            const [day, month, year] = finalDate.split('/');
            const apiTransferDate = `${year}-${month}-${day}`;

            await apiService.transfer(token, {
                value: numericAmount,
                currency: currency,
                payeerDocument: recipient.trim(),
                transferDate: apiTransferDate,
            });

            await refreshData();

            const message =
                finalDate === today
                    ? 'Transferencia realizada con éxito.'
                    : `Transferencia programada para el ${finalDate}.`;

            Alert.alert('Operación Exitosa', message, [
                { text: 'OK', onPress: () => navigation.goBack() },
            ]);
        } catch {
            setError('Ocurrió un error al procesar la transferencia.');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        recipient,
        setRecipient,
        amount,
        setAmount,
        currency,
        setCurrency,
        date,
        setDate,
        isScheduled,
        setIsScheduled: handleToggleScheduled,
        error,
        handleTransfer,
        handleAmountChange,
        isLoading,
    };
};
