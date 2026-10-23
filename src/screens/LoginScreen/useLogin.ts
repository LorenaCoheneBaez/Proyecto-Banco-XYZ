import { useState } from 'react';
import { Alert } from 'react-native';
import { LoginNavigationProp } from '../../types/navigation.types';

//Mock de datos para login
const VALID_EMAIL = 'usuario@banco.com';
const VALID_PASSWORD = 'password123';

//Valido el formato del correo electrónico
const validateEmailFormat = (text: string) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(text);
};

export const useLogin = (navigation: LoginNavigationProp) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [authError, setAuthError] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const resetErrors = () => {
        setEmailError('');
        setPasswordError('');
        setAuthError('');
    };

    const validateAndLogin = () => {
        resetErrors();
        let isValid = true;

        if (!email) {
            setEmailError('El correo electrónico es requerido.');
            isValid = false;
        } else if (!validateEmailFormat(email)) {
            setEmailError('Ingresa un formato de correo válido.');
            isValid = false;
        }

        if (!password) {
            setPasswordError('La contraseña es requerida.');
            isValid = false;
        }

        if (isValid) {
            if (email.toLowerCase() === VALID_EMAIL && password === VALID_PASSWORD) {
                navigation.replace('Home');
            } else {
                setAuthError('Credenciales inválidas. Verifica tu correo y contraseña.');
            }
        }
    };

    const handleForgotPassword = () => {
        resetErrors();

        if (!email) {
            setEmailError('Ingresa tu correo para recuperar la contraseña.');
            return;
        }
        if (!validateEmailFormat(email)) {
            setEmailError('Ingresa un formato de correo válido (ej. usuario@banco.com).');
            return;
        }

        Alert.alert(
            'Recuperación de contraseña',
            `Recibirás un enlace a ${email} con las instrucciones en breve.`,
        );
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
        isPasswordVisible,
        setIsPasswordVisible,
        validateAndLogin,
        handleForgotPassword,
    };
};
