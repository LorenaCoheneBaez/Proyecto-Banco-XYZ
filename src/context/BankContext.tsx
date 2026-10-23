import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Transfer, BankContextData } from '../types/account.types';

interface BankProviderProps {
    children: ReactNode;
}

const BankContext = createContext<BankContextData | undefined>(undefined);

export const BankProvider: React.FC<BankProviderProps> = ({ children }) => {
    const [balance, setBalance] = useState<number>(15000.50);
    const [transfers, setTransfers] = useState<Transfer[]>([]);

    const addTransfer = (transferData: Omit<Transfer, 'id'>) => {
        const newTransfer: Transfer = {
            ...transferData,
            id: Math.random().toString(36).substring(2, 11),
        };

        setTransfers((prevTransfers) => [newTransfer, ...prevTransfers]);
        setBalance((prevBalance) => prevBalance - transferData.amount);
    };

    return (
        <BankContext.Provider value={{ balance, transfers, addTransfer }}>
            {children}
        </BankContext.Provider>
    );
};

export const useBank = (): BankContextData => {
    const context = useContext(BankContext);

    if (context === undefined) {
        throw new Error('useBank debe ser usado dentro de un BankProvider');
    }

    return context;
};