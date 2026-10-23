export interface Transfer {
    id: string;
    recipient: string;
    amount: number;
    date: string; // Formato YYYY-MM-DD
}

export interface BankContextData {
    balance: number;
    transfers: Transfer[];
    addTransfer: (transfer: Omit<Transfer, 'id'>) => void;
}