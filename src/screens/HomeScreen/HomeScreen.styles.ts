import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors.styles';

export const styles = StyleSheet.create({
    actionsContainer: {
        marginTop: 10,
        gap: 16,
    },
    secondaryButton: {
        backgroundColor: '#2c3e50',
    },
    logoutButton: {
        marginTop: 'auto',
        marginBottom: 20,
        paddingVertical: 12,
        alignItems: 'center',
    },
    logoutText: {
        color: colors.danger,
        fontSize: 16,
        fontWeight: '600',
    },
});
