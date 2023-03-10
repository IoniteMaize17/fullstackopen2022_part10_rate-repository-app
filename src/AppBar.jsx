import { View, StyleSheet, Text, ScrollView, Pressable } from 'react-native';
import { Link } from "react-router-native";
import Constants from 'expo-constants';
import THEME_CONFIG from './theme';
import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from './graphql/queries'
import { useSignOut } from './hooks/useSignOut';

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
    const [ signOut ] = useSignOut();
    const { data, loading, error } = useQuery(GET_CURRENT_USER, {
        variables: {
            includeReviews: false
        }
    });
    if (loading) {
        return null;
    }
    if (error) {
        return (
            <Text>Errors ...</Text>
        )
    }
    const handleSignOut = () => {
        signOut();
    }
    return (
        <View style={styles.container}>
            <ScrollView horizontal>
                <Link to="/">
                    <Text style={styles.press_text}>Repositories</Text>
                </Link>
                {data.me ? (
                    <>
                        <Link to="/create-new-review">
                            <Text style={styles.press_text}>Create a review</Text>
                        </Link>
                        <Link to="/my-review">
                            <Text style={styles.press_text}>My reviews</Text>
                        </Link>
                        <Pressable onPress={handleSignOut}>
                            <Text style={styles.press_text}>Sign Out</Text>
                        </Pressable>
                    </>
                ) : (
                    <>
                        <Link to="/sign-in">
                            <Text style={styles.press_text}>Sign In</Text>
                        </Link>
                        <Link to="/sign-up">
                            <Text style={styles.press_text}>Sign Up</Text>
                        </Link>
                    </>
                )}
            </ScrollView>
        </View>
    );
};

export default AppBar;