import { Text, View, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
import * as yup from 'yup';
import FormikTextInput from './helpers/FormikTextInput'
import { Formik } from 'formik';
import { useSignIn } from '../hooks/useSignIn'
import THEME_CONFIG from '../theme';

const SignIn = () => {
    const navigate = useNavigate();
    const [signIn] = useSignIn();

    const validationSchema = yup.object().shape({
        username: yup
            .string()
            .required('Username is required'),
        password: yup
            .string()
            .required('Password is required'),
    });
    const initialValues = {
        username: 'kalle',
        password: 'password'
    }
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
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                {({ handleSubmit }) => {
                    return (
                        <View>
                            <FormikTextInput name="username" placeholder="Username" />
                            <FormikTextInput name="password" placeholder="Password" />
                            <Pressable style={{
                                backgroundColor: THEME_CONFIG.colors.primary,
                                borderRadius: 5
                            }} onPress={handleSubmit}>
                                <Text style={{
                                    color: THEME_CONFIG.colors.white,
                                    textAlign: 'center',
                                    padding: THEME_CONFIG.size.padding,
                                    fontWeight: THEME_CONFIG.fontWeights.bold
                                }}>Sign in</Text>
                            </Pressable>
                        </View>
                    )
                }}
            </Formik>
        </View>
    );
};

export default SignIn;