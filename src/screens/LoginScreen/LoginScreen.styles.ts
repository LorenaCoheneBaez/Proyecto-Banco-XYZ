import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors.styles';

export const styles = StyleSheet.create({
    centered: {
        justifyContent: 'center',
    },
    inputContainer: {
        marginBottom: 16,
    },
    inputError: {
        borderColor: colors.danger,
        borderWidth: 1.5,
    },
    errorText: {
        color: colors.danger,
        fontSize: 12,
        marginTop: 4,
        marginLeft: 4,
    },
    passwordWrapper: {
        position: 'relative',
        justifyContent: 'center',
    },
    passwordInput: {
        marginBottom: 0,
        paddingRight: 70,
    },
    eyeButton: {
        position: 'absolute',
        right: 15,
        height: '100%',
        justifyContent: 'center',
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: 24,
    },
    forgotPasswordText: {
        color: colors.primary,
        fontSize: 14,
        fontWeight: '500',
    },
    globalErrorContainer: {
        backgroundColor: '#ffebee',
        padding: 12,
        borderRadius: 8,
        marginBottom: 20,
        borderLeftWidth: 4,
        borderLeftColor: colors.danger,
    },
    globalErrorText: {
        color: colors.danger,
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
    },
});
