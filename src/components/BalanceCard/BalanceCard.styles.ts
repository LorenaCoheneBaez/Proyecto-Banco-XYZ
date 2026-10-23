import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors.styles';

export const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.primary,
        padding: 24,
        borderRadius: 16,
        alignItems: 'center',
        marginBottom: 24,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
    },
    label: {
        color: 'rgba(255,255,255,0.85)',
        fontSize: 16,
        marginBottom: 8,
        fontWeight: '500',
    },
    balance: {
        color: '#ffffff',
        fontSize: 36,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
});
