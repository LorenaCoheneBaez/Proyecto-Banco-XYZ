import { useBank } from '../../context/BankContext';

export const useBalanceCard = () => {
    const { balance } = useBank();

    //Formato de moneda para Argentina (ARS)
    const formatCurrencyARS = (amount: number) => {
        const [integer, decimal] = amount.toFixed(2).split('.');

        const formattedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

        return `$${formattedInteger},${decimal}`;
    };

    return {
        formattedBalance: formatCurrencyARS(balance),
    };
};
