import React from 'react';
import { renderHook, act } from '@testing-library/react-native';
import { BankProvider, useBank } from './BankContext';
import { apiService } from '../services/api.service';

// Hacemos un Mock de las librerías
jest.mock('expo-secure-store');
jest.mock('../services/api.service');

describe('BankContext Integración API', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
        <BankProvider>{children}</BankProvider>
    );

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('debe mapear correctamente los datos de la API al estado interno tras un refreshData', async () => {
        (apiService.getBalance as jest.Mock).mockResolvedValue({ moneda: 'ARS', saldoCuenta: 25000 });
        (apiService.getTransfers as jest.Mock).mockResolvedValue([
            { valor: 1500, fecha: '2026-10-23', moneda: 'ARS', payeer: { documento: '1', nombre: 'Alejo Topaz' } }
        ]);

        const { result } = await renderHook(() => useBank(), { wrapper });

        await act(async () => {
            // Simulamos que el usuario tiene un token válido
            await result.current.saveToken('fake-jwt-token');
            await result.current.refreshData();
        });

        // Verificamos que el balance se actualizó
        expect(result.current.balance).toBe(25000);

        // Verificamos que el adaptador transformó la fecha y el nombre correctamente
        expect(result.current.transfers).toHaveLength(1);
        expect(result.current.transfers[0].date).toBe('23/10/2026'); // Fecha transformada
        expect(result.current.transfers[0].recipient).toBe('Alejo Topaz');
    });
});