import React from 'react';
import { renderHook, act } from '@testing-library/react-native';
import { BankProvider, useBank } from './BankContext';

describe('BankContext', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
        <BankProvider>{children}</BankProvider>
    );

    it('debe arrojar un error si useBank se usa sin BankProvider', async () => {
        const consoleSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(() => { });

        try {
            await expect(renderHook(() => useBank())).rejects.toThrow(
                'useBank debe ser usado dentro de un BankProvider'
            );
        } finally {
            consoleSpy.mockRestore();
        }
    });

    it('debe iniciar con saldo de 15000.50 y sin transferencias', async () => {
        const { result } = await renderHook(() => useBank(), { wrapper });

        expect(result.current.balance).toBe(15000.5);
        expect(result.current.transfers).toEqual([]);
    });

    it('debe descontar el saldo al agregar una transferencia', async () => {
        const { result } = await renderHook(() => useBank(), { wrapper });

        const initialBalance = result.current.balance;

        await act(async () => {
            await result.current.addTransfer({
                recipient: 'Juan Pérez',
                amount: 500,
                date: '25/10/2026',
            });
        });

        expect(result.current.balance).toBe(initialBalance - 500);
        expect(result.current.transfers).toHaveLength(1);
        expect(result.current.transfers[0].recipient).toBe('Juan Pérez');
        expect(result.current.transfers[0].id).toBeDefined();
    });
});