import { Ionicons } from '@expo/vector-icons';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { globalStyles } from '../../styles/theme.styles';
import { styles } from './LoginScreen.styles';
import { useLogin } from './useLogin';

export const LoginScreen = ({ navigation }: any) => {
  const {
    email, setEmail, setEmailError, emailError,
    password, setPassword, setPasswordError, passwordError,
    authError, setAuthError,
    isPasswordVisible, setIsPasswordVisible,
    validateAndLogin, handleForgotPassword
  } = useLogin(navigation);

  const clearErrors = () => {
    setEmailError('');
    setPasswordError('');
    setAuthError('');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[globalStyles.container, styles.centered]}>

          <Text style={globalStyles.title}>Iniciar Sesión</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={[globalStyles.input, (emailError || authError) ? styles.inputError : null, { marginBottom: 0 }]}
              placeholder="Correo electrónico"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={(text) => { setEmail(text); clearErrors(); }}
            />
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.passwordWrapper}>
              <TextInput
                style={[
                  globalStyles.input,
                  (passwordError || authError) ? styles.inputError : null,
                  styles.passwordInput
                ]}
                placeholder="Contraseña"
                secureTextEntry={!isPasswordVisible}
                value={password}
                onChangeText={(text) => { setPassword(text); clearErrors(); }}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                <Ionicons
                  name={isPasswordVisible ? 'eye-off' : 'eye'}
                  size={24}
                />
              </TouchableOpacity>
            </View>
            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
          </View>

          {/* Se simula el flujo de recuperar contraseña */}
          <TouchableOpacity style={styles.forgotPassword} onPress={handleForgotPassword}>
            <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>

          {/* Error global de autenticación */}
          {authError ? (
            <View style={styles.globalErrorContainer}>
              <Text style={styles.globalErrorText}>{authError}</Text>
            </View>
          ) : null}

          <TouchableOpacity style={globalStyles.button} onPress={validateAndLogin}>
            <Text style={globalStyles.buttonText}>Ingresar</Text>
          </TouchableOpacity>

        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};