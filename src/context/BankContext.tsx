import * as SecureStore from 'expo-secure-store';
import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { apiService } from '../services/api.service';
import { BankContextData, TransferItem } from '@/types/account.types';

const BankContext = createContext<BankContextData | undefined>(undefined);
const TOKEN_KEY = 'jwt_bank_token';

export const BankProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const [balance, setBalance] = useState<number>(0);
    const [transfers, setTransfers] = useState<TransferItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [balanceCurrency, setBalanceCurrency] = useState<string>('ARS');

    const saveToken = async (newToken: string) => {
        await SecureStore.setItemAsync(TOKEN_KEY, newToken);
        setToken(newToken);
    };

    const logout = async () => {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
        setToken(null);
        setBalance(0);
        setTransfers([]);
    };

    const refreshData = useCallback(async (currentToken?: string) => {
        const activeToken = currentToken || token;
        if (!activeToken) return;

        setIsLoading(true);
        try {
            const balanceData = await apiService.getBalance(activeToken);
            setBalance(balanceData.accountBalance);
            setBalanceCurrency(balanceData.currency);

            const historyResponse = await apiService.getTransfers(activeToken);
            setTransfers(historyResponse.transfers || []);
        } catch (error) {
            console.error('Error obteniendo datos', error);
        } finally {
            setIsLoading(false);
        }
    }, [token]);

    useEffect(() => {
        const loadToken = async () => {
            try {
                const storedToken = await SecureStore.getItemAsync(TOKEN_KEY);
                if (storedToken) {
                    setToken(storedToken);
                    await refreshData(storedToken);
                }
            } catch (error) {
                console.error('Error leyendo el token seguro', error);
            } finally {
                setIsLoading(false);
            }
        };
        loadToken();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <BankContext.Provider value={{ token, balance, balanceCurrency, transfers, isLoading, saveToken, logout, refreshData }}>
            {children}
        </BankContext.Provider>
    );
};

export const useBank = () => {
    const context = useContext(BankContext);
    if (!context) throw new Error('useBank debe usarse dentro de BankProvider');
    return context;
};