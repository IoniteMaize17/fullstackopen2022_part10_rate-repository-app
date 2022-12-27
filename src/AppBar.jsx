import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { Link } from "react-router-native";
import Constants from 'expo-constants';
import THEME_CONFIG from './theme';

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        backgroundColor: THEME_CONFIG.colors.textPrimary,
        flexDirection: 'row'
    },
    press_text: {
        padding: THEME_CONFIG.size.padding,
        color: THEME_CONFIG.colors.white,
        fontWeight: THEME_CONFIG.fontWeights.bold
    }
});

const AppBar = () => {
    return (
        <View style={styles.container}>
            <ScrollView horizontal>
                <Link to="/">
                    <Text style={styles.press_text}>Repositories</Text>
                </Link>
                <Link to="/sign-in">
                    <Text style={styles.press_text}>Sign In</Text>
                </Link>
            </ScrollView>
        </View>
    );
};

export default AppBar;