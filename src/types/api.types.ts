export interface LoginResponse {
    token: string;
    usuario: {
        id: number;
        nombre: string;
        'correo electrónico': string;
    };
}

export interface BalanceResponse {
    moneda: string;
    saldoCuenta: number;
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
    valor: number;
    fecha: string;
    moneda: string;
    payeer: {
        documento: string;
        nombre: string;
    };
}
