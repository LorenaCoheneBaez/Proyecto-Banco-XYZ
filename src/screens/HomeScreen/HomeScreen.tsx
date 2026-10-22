import { Text, View } from 'react-native';
import { globalStyles } from '../../styles/theme';

export const HomeScreen = () => {
    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.title}>Bienvenido a la App del Banco XYZ</Text>
        </View>
    )
}