import { useState, useMemo } from 'react';
import { useBank } from '../../context/BankContext';
import { useDebounce } from '../../hooks/useDebounce';
import { normalizeAmountInput } from '../../utils/currency.utils';

export const useHistory = () => {
    const { transfers } = useBank();
    const safeTransfers = Array.isArray(transfers) ? transfers : [];

    const [filterName, setFilterName] = useState<string>('');
    const [filterAmount, setFilterAmount] = useState<string>('');
    const [filterDate, setFilterDate] = useState<string>('');

    const debouncedName = useDebounce(filterName, 500);
    const debouncedAmount = useDebounce(filterAmount, 500);
    const debouncedDate = useDebounce(filterDate, 500);

    const isTotalEmpty = safeTransfers.length === 0;
    const hasActiveFilters = filterName !== '' || filterAmount !== '' || filterDate !== '';

    const clearFilters = () => {
        setFilterName('');
        setFilterAmount('');
        setFilterDate('');
    };

    const handleFilterAmountChange = (text: string) => {
        setFilterAmount(normalizeAmountInput(text));
    };

    const filteredTransfers = useMemo(() => {
        return safeTransfers.filter(transfer => {
            const nameText = transfer?.payeer?.name || '';
            const docText = transfer?.payeer?.document || '';

            const matchName = debouncedName
                ? nameText.toLowerCase().includes(debouncedName.toLowerCase()) ||
                  docText.includes(debouncedName)
                : true;

            const matchAmount = debouncedAmount
                ? transfer?.value === parseFloat(debouncedAmount.replace(',', '.'))
                : true;

            // La API devuelve la fecha en formato YYYY-MM-DD
            const matchDate = debouncedDate ? transfer?.date?.includes(debouncedDate) : true;

            return matchName && matchAmount && matchDate;
        });
    }, [safeTransfers, debouncedName, debouncedAmount, debouncedDate]);

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
        handleFilterAmountChange,
    };
};
