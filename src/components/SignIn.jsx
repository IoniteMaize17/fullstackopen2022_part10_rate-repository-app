import { View } from 'react-native';
import { useNavigate } from 'react-router-native';
import FormSignIn from './helpers/FormSignIn'
import { useSignIn } from '../hooks/useSignIn'
import THEME_CONFIG from '../theme';

const SignIn = () => {
    const navigate = useNavigate();
    const [signIn] = useSignIn();

    const onSubmit = async (values) => {
        const { username, password } = values;
        try {
            const status = await signIn({ username, password });
            if (status) {
                navigate('/')
            }
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <View style={{
            backgroundColor: THEME_CONFIG.colors.white,
            padding: THEME_CONFIG.size.padding
        }}>
            <FormSignIn onSubmit={onSubmit} />
        </View>
    );
};

export default SignIn;