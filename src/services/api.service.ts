import {
    LoginResponse,
    BalanceResponse,
    TransferPayload,
    TransferResponse,
    TransferItem,
} from '../types/api.types';

const BASE_URL_LOGIN = process.env.EXPO_PUBLIC_API_URL;
const BASE_URL_BALANCE = process.env.EXPO_PUBLIC_API_BALANCE;
const BASE_URL_TRANSFER = process.env.EXPO_PUBLIC_API_TRANSFER;
const BASE_URL_TRANSFER_LIST = process.env.EXPO_PUBLIC_API_TRANSFER_LIST;

export const apiService = {
    login: async (email: string, password: string): Promise<LoginResponse> => {
        const response = await fetch(`${BASE_URL_LOGIN}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) throw new Error('Credenciales inválidas');
        return response.json();
    },

    getBalance: async (token: string): Promise<BalanceResponse> => {
        const response = await fetch(`${BASE_URL_BALANCE}/balance`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error('Error al obtener saldo');
        return response.json();
    },

    transfer: async (token: string, payload: TransferPayload): Promise<TransferResponse> => {
        const response = await fetch(`${BASE_URL_TRANSFER}/transfer`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) throw new Error('Error en transferencia');
        return response.json();
    },

    getTransfers: async (token: string): Promise<TransferItem[]> => {
        const response = await fetch(`${BASE_URL_TRANSFER_LIST}/transferList`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error('Error al listar transferencias');
        return response.json();
    },
};