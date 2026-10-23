import { parseArgDate, isValidArgDate } from './date.utils';

describe('Date Utils - date.utils.ts', () => {
    describe('isValidArgDate', () => {
        it('debe retornar true para fechas válidas en formato DD/MM/AAAA', () => {
            expect(isValidArgDate('22/10/2026')).toBe(true);
            expect(isValidArgDate('01/01/2026')).toBe(true);
        });

        it('debe retornar false para fechas inválidas o mal formateadas', () => {
            expect(isValidArgDate('32/01/2026')).toBe(false); // Día inexistente
            expect(isValidArgDate('2026-10-22')).toBe(false); // Formato ISO no admitido
            expect(isValidArgDate('22-10-2026')).toBe(false); // Uso de guiones
            expect(isValidArgDate('texto')).toBe(false); // Basura
        });
    });

    describe('parseArgDate', () => {
        it('debe convertir un string DD/MM/AAAA a un objeto Date correcto', () => {
            const result = parseArgDate('25/12/2026');

            expect(result.getFullYear()).toBe(2026);
            expect(result.getMonth()).toBe(11); // En JS los meses van de 0 a 11 (Diciembre = 11)
            expect(result.getDate()).toBe(25);
        });
    });
});
