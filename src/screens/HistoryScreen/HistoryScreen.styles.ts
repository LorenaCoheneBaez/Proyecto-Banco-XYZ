import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors.styles';

export const styles = StyleSheet.create({
    emptyText: {
        textAlign: 'center',
        marginTop: 40,
        color: colors.textLight,
        fontSize: 16,
        fontStyle: 'italic',
    },
    disabledInput: {
        backgroundColor: '#f5f5f5',
        borderColor: '#eaeaea',
        color: '#a0a0a0',
    },
    filtersContainer: {
        backgroundColor: colors.card,
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        elevation: 2,
    },
    filterTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 12,
        color: colors.text,
    },
    headerFilters: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    clearFiltersText: {
        color: colors.primary,
        fontSize: 14,
        fontWeight: '600',
    },
    inputSmall: {
        marginBottom: 8,
        padding: 10,
    },
    itemCard: {
        backgroundColor: colors.card,
        padding: 16,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
        borderLeftWidth: 4,
        borderLeftColor: colors.success,
    },
    // Estilo para transferencias programadas
    itemCardScheduled: {
        borderLeftColor: '#f39c12',
        backgroundColor: '#fffdfaa6',
    },
    badge: {
        backgroundColor: '#fef5e7',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        marginTop: 6,
        alignSelf: 'flex-start',
    },
    badgeText: {
        color: '#d68910',
        fontSize: 10,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    recipient: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.text,
    },
    date: {
        fontSize: 12,
        color: colors.textLight,
        marginTop: 4,
    },
    amount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.text,
    },
});
