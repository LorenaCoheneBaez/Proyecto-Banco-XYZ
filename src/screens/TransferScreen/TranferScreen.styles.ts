import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors.styles';

export const styles = StyleSheet.create({
    formContainer: {
        backgroundColor: colors.card,
        padding: 20,
        borderRadius: 12,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.text,
        marginBottom: 8,
        marginTop: 12,
    },
    errorText: {
        color: colors.danger,
        fontSize: 14,
        marginBottom: 16,
        textAlign: 'center',
        fontWeight: '500',
    },
    helpText: {
        fontSize: 12,
        color: colors.textLight,
        marginBottom: 16,
        fontStyle: 'italic',
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 16,
        marginBottom: 16,
        paddingVertical: 8,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    switchLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: colors.text,
    },
});
