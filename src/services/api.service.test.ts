import { apiService } from './api.service';

// Simulamos la función fetch
globalThis.fetch = jest.fn() as any;

describe('apiService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('login: debe realizar la petición POST y devolver el token', async () => {
        const mockResponse = {
            token: 'jwt-123',
            usuario: { id: 1, nombre: 'Test', 'correo electrónico': 't@t.com' },
        };
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse,
        });

        const result = await apiService.login('t@t.com', '1234');

        expect(fetch).toHaveBeenCalledWith(
            expect.stringContaining('/login'),
            expect.objectContaining({
                method: 'POST',
                body: JSON.stringify({ email: 't@t.com', password: '1234' }),
            }),
        );
        expect(result).toEqual(mockResponse);
    });

    it('getBalance: debe enviar el Bearer token en los headers', async () => {
        const mockResponse = { accountBalance: 1500, currency: 'USD' };
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse,
        });

        const result = await apiService.getBalance('jwt-123');

        expect(fetch).toHaveBeenCalledWith(
            expect.stringContaining('/balance'),
            expect.objectContaining({
                headers: { Authorization: 'Bearer jwt-123' },
            }),
        );
        expect(result).toEqual(mockResponse);
    });

    it('lanza un error estándar si la petición HTTP falla', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

        await expect(apiService.getTransfers('jwt-123')).rejects.toThrow(
            'Error al listar transferencias',
        );
    });
});
