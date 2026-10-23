import { useState } from 'react';
import { Alert } from 'react-native';
import { apiService } from '../../services/api.service';
import { useBank } from '../../context/BankContext';

export const useLogin = (navigation: any) => {
    const { saveToken, refreshData } = useBank();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [authError, setAuthError] = useState('');

    const clearErrors = () => {
        setEmailError('');
        setPasswordError('');
        setAuthError('');
    };

    const validateAndLogin = async () => {
        clearErrors();
        let isValid = true;

        // Expresión regular para validar formato
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email.trim()) {
            setEmailError('El correo es obligatorio');
            isValid = false;
        } else if (!emailRegex.test(email.trim())) {
            setEmailError('Ingresa un correo electrónico válido');
            isValid = false;
        }

        if (!password.trim()) {
            setPasswordError('La contraseña es obligatoria');
            isValid = false;
        }

        if (!isValid) return;

        setIsLoading(true);
        try {
            const data = await apiService.login(email.trim(), password);
            await saveToken(data.token);
            await refreshData();
            navigation.replace('Home');
        } catch (err) {
            setAuthError('Credenciales inválidas. Verifica tus datos.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleForgotPassword = () => {
        Alert.alert('Recuperar contraseña', 'Contacte a soporte para restablecer su clave.');
    };

    return {
        email,
        setEmail,
        password,
        setPassword,
        emailError,
        setEmailError,
        passwordError,
        setPasswordError,
        authError,
        setAuthError,
        isLoading,
        isPasswordVisible,
        setIsPasswordVisible,
        validateAndLogin,
        handleForgotPassword,
        clearErrors,
    };
};
