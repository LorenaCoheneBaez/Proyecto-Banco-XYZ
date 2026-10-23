import React, { createContext, useState, useContext, ReactNode } from 'react';
import { BankContextData } from '../types/account.types';

interface BankProviderProps {
    children: ReactNode;
}

const BankContext = createContext<BankContextData | undefined>(undefined);

export const BankProvider: React.FC<BankProviderProps> = ({ children }) => {
    const [balance, setBalance] = useState<number>(15000.50);

    return (
        <BankContext.Provider value={{ balance }}>
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