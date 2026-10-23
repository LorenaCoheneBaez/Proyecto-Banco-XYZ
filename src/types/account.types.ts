export interface Transfer {
    id: string;
    recipient: string;
    amount: number;
    date: string; // Formato YYYY-MM-DD
}

export interface BankContextData {
    token: string | null;
    balance: number;
    transfers: any[];
    isLoading: boolean;
    saveToken: (token: string) => Promise<void>;
    logout: () => Promise<void>;
    refreshData: () => Promise<void>;
}