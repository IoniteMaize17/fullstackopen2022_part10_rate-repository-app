import { View } from 'react-native';
import { useNavigate } from 'react-router-native';
import FormSignUp from './helpers/FormSignUp'
import { useSignUp } from '../hooks/useSignUp'
import { useSignIn } from '../hooks/useSignIn'
import THEME_CONFIG from '../theme';

const SignUp = () => {
    const navigate = useNavigate();
    const [signUp] = useSignUp();
    const [SignIn] = useSignIn();

    const onSubmit = async (values) => {
        const { username, password } = values;
        try {
            const status = await signUp({ username, password });
            if (status) {
                const status_login = await SignIn({ username, password });
                if (status_login) navigate('/')
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
            <FormSignUp onSubmit={onSubmit} />
        </View>
    );
};

export default SignUp;