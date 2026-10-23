import React, { createContext, useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { apiService } from '../services/api.service';
import { Transfer } from '../types/account.types';

interface BankContextData {
    token: string | null;
    balance: number;
    transfers: Transfer[];
    isLoading: boolean;
    saveToken: (token: string) => Promise<void>;
    logout: () => Promise<void>;
    refreshData: () => Promise<void>;
}

const BankContext = createContext<BankContextData | undefined>(undefined);
const TOKEN_KEY = 'jwt_bank_token';

export const BankProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const [balance, setBalance] = useState<number>(0);
    const [transfers, setTransfers] = useState<Transfer[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadToken = async () => {
            try {
                const storedToken = await SecureStore.getItemAsync(TOKEN_KEY);
                if (storedToken) setToken(storedToken);
            } catch (error) {
                console.error('Error leyendo token', error);
            } finally {
                setIsLoading(false);
            }
        };
        loadToken();
    }, []);

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

    const refreshData = async () => {
        if (!token) return;
        setIsLoading(true);
        try {
            const balanceData = await apiService.getBalance(token);
            setBalance(balanceData.saldoCuenta);

            const historyData = await apiService.getTransfers(token);

            const mappedTransfers: Transfer[] = historyData.map((t, index) => {
                // Convertimos "YYYY-MM-DD" a "DD/MM/AAAA"
                const [year, month, day] = t.fecha.split('-');
                return {
                    id: index.toString(),
                    amount: t.valor,
                    date: `${day}/${month}/${year}`,
                    recipient: t.payeer.nombre || t.payeer.documento
                };
            });

            setTransfers(mappedTransfers);
        } catch (error) {
            console.error('Error obteniendo datos de la API', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <BankContext.Provider value={{ token, balance, transfers, isLoading, saveToken, logout, refreshData }}>
            {children}
        </BankContext.Provider>
    );
};

export const useBank = () => {
    const context = useContext(BankContext);
    if (!context) throw new Error('useBank debe usarse dentro de BankProvider');
    return context;
};