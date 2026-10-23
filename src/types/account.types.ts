export interface TransferItem {
    value: number;
    date: string;
    currency: string;
    payeer: {
        document: string;
        name: string;
    };
}

export interface TransferListResponse {
    message: string;
    transfers: TransferItem[];
}

export interface BankContextData {
    token: string | null;
    balance: number;
    balanceCurrency: string; 
    transfers: TransferItem[]; 
    isLoading: boolean;
    saveToken: (token: string) => Promise<void>;
    logout: () => Promise<void>;
    refreshData: (currentToken?: string) => Promise<void>;
}