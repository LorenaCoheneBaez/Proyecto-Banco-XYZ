
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BankProvider } from '../context/BankContext';
import { HomeScreen } from '../screens/HomeScreen/HomeScreen';
import { LoginScreen } from '../screens/LoginScreen/LoginScreen';
import { TransferScreen } from '../screens/TransferScreen/TransferScreen';
import { HistoryScreen } from '../screens/HistoryScreen/HistoryScreen';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <BankProvider>
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
                    <Stack.Screen name="Transfer" component={TransferScreen} options={{ title: 'Transferir' }} />
                    <Stack.Screen name="History" component={HistoryScreen} options={{ title: 'Historial' }} />
            </Stack.Navigator>
        </NavigationContainer>
        </BankProvider>
    )
}