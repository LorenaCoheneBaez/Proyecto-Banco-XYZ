import { useBank } from '../../context/BankContext';
import { formatCurrencyARS } from '../../utils/currency.utils';

export const useBalanceCard = () => {
    const { balance, isLoading } = useBank();

    return {
        balance,
        formattedBalance: formatCurrencyARS(balance),
        isLoading,
    };
};
