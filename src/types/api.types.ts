export interface LoginResponse {
    token: string;
    usuario: {
        id: number;
        nombre: string;
        'correo electrónico': string;
    };
}

export interface BalanceResponse {
    currency: string;
    accountBalance: number;
}

export interface TransferPayload {
    value: number;
    currency: string;
    payeerDocument: string;
    transferDate: string;
}

export interface TransferResponse {
    estado: string;
}
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
