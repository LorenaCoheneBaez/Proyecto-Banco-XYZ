export const formatCurrencyARS = (amount: number): string => {
    const [integer, decimal] = amount.toFixed(2).split('.');
    // Agrega puntos a los miles
    const formattedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `$${formattedInteger},${decimal}`;
};

export const normalizeAmountInput = (text: string): string => {
    let visualText = text.replace('.', ',');
    visualText = visualText.replace(/[^0-9,]/g, ''); // Bloquea letras

    const parts = visualText.split(',');

    if (parts.length > 2) {
        visualText = parts[0] + ',' + parts.slice(1).join('');
    }

    if (parts.length > 1) {
        visualText = parts[0] + ',' + parts[1].slice(0, 2); // Máximo 2 decimales
    }

    return visualText;
};