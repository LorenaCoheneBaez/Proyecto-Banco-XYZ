import { useBank } from '../../context/BankContext';

export const useBalanceCard = () => {
    const { balance } = useBank();

    
    return {
        balance: balance,
    };
};
