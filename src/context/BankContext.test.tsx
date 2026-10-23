import { render, waitFor, act, fireEvent } from '@testing-library/react-native';
import { BankProvider, useBank } from './BankContext';
import { apiService } from '../services/api.service';
import * as SecureStore from 'expo-secure-store';
import { Text, TouchableOpacity } from 'react-native';

// Hacemos un Mock de las librerías
jest.mock('../services/api.service');
jest.mock('expo-secure-store');

const TestComponent = () => {
    const { balance, balanceCurrency, transfers, refreshData } = useBank();
    return (
        <>
            <Text testID="balance">{balance}</Text>
            <Text testID="currency">{balanceCurrency}</Text>
            <Text testID="transfersCount">{transfers.length}</Text>
            <TouchableOpacity testID="refreshButton" onPress={() => refreshData('fake-token')} />
        </>
    );
};

describe('BankContext Integración API', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('debe mapear correctamente los datos de la API al estado interno tras un refreshData', async () => {
        const mockBalance = { accountBalance: 25000, currency: 'ARS' };
        const mockHistory = {
            message: 'OK',
            transfers: [{ value: 1000, currency: 'ARS', date: '2026-10-23', payeer: { name: 'Juan', document: '123' } }]
        };

        (apiService.getBalance as jest.Mock).mockResolvedValue(mockBalance);
        (apiService.getTransfers as jest.Mock).mockResolvedValue(mockHistory);
        (SecureStore.getItemAsync as jest.Mock).mockResolvedValue('fake-token');

        const { getByTestId } = await render(
            <BankProvider>
                <TestComponent />
            </BankProvider>
        );

        await act(async () => {
            fireEvent.press(getByTestId('refreshButton'));
        });

        await waitFor(() => {
            expect(getByTestId('balance').props.children).toBe(25000);
            expect(getByTestId('currency').props.children).toBe('ARS');
            expect(getByTestId('transfersCount').props.children).toBe(1);
        });
    });
});