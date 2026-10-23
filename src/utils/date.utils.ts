// Devuelve la fecha actual en formato DD/MM/AAAA
export const getTodayArg = (): string => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
};

export const getTomorrowArg = (): string => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1); // JavaScript maneja los saltos de mes automáticamente

    const day = String(tomorrow.getDate()).padStart(2, '0');
    const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const year = tomorrow.getFullYear();
    return `${day}/${month}/${year}`;
};

export const parseArgDate = (dateStr: string): Date => {
    const [day, month, year] = dateStr.split('/');
    return new Date(Number(year), Number(month) - 1, Number(day));
};

// Valida que el formato sea estrictamente DD/MM/AAAA y sea una fecha real
export const isValidArgDate = (dateStr: string): boolean => {
    const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    if (!regex.test(dateStr)) return false;

    const date = parseArgDate(dateStr);
    return !isNaN(date.getTime());
};
