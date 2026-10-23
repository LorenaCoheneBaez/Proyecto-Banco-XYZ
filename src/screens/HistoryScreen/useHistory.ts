import { useState, useMemo } from 'react';
import { useBank } from '../../context/BankContext';
import { useDebounce } from '../../hooks/useDebounce';

export const useHistory = () => {
    const { transfers } = useBank();

    const [filterName, setFilterName] = useState<string>('');
    const [filterAmount, setFilterAmount] = useState<string>('');
    const [filterDate, setFilterDate] = useState<string>('');

    const debouncedName = useDebounce(filterName, 500);
    const debouncedAmount = useDebounce(filterAmount, 500);
    const debouncedDate = useDebounce(filterDate, 500);

    const isTotalEmpty = transfers.length === 0;

    const hasActiveFilters = filterName !== '' || filterAmount !== '' || filterDate !== '';

    const clearFilters = () => {
        setFilterName('');
        setFilterAmount('');
        setFilterDate('');
    };

    const filteredTransfers = useMemo(() => {
        return transfers.filter(transfer => {
            const matchName = transfer.recipient
                .toLowerCase()
                .includes(debouncedName.toLowerCase());

            const matchAmount = debouncedAmount
                ? transfer.amount === parseFloat(debouncedAmount)
                : true;

            const matchDate = debouncedDate ? transfer.date.includes(debouncedDate) : true;

            return matchName && matchAmount && matchDate;
        });
    }, [transfers, debouncedName, debouncedAmount, debouncedDate]);

    return {
        filterName,
        setFilterName,
        filterAmount,
        setFilterAmount,
        filterDate,
        setFilterDate,
        filteredTransfers,
        isTotalEmpty,
        hasActiveFilters,
        clearFilters,
    };
};
