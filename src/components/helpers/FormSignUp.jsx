import { Text, View, Pressable } from 'react-native';
import * as yup from 'yup';
import FormikTextInput from './FormikTextInput'
import { Formik } from 'formik';
import THEME_CONFIG from '../../theme';

const FormSignUp = ({onSubmit}) => {
    const validationSchema = yup.object().shape({
        username: yup
            .string()
            .required('Username is required'),
        password: yup
            .string()
            .required('Password is required'),
        password_confirm: yup
            .string()
            .required('Password confirmation is required')
            .oneOf([yup.ref('password'), null], 'Passwords must match'),
    });
    const initialValues = {
        username: '',
        password: '',
        password_confirm: ''
    }
    return (
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
                        <FormikTextInput name="password_confirm" placeholder="Password confirm" />
                        <Pressable style={{
                            backgroundColor: THEME_CONFIG.colors.primary,
                            borderRadius: 5
                        }} onPress={handleSubmit}>
                            <Text style={{
                                color: THEME_CONFIG.colors.white,
                                textAlign: 'center',
                                padding: THEME_CONFIG.size.padding,
                                fontWeight: THEME_CONFIG.fontWeights.bold
                            }}>Sign up</Text>
                        </Pressable>
                    </View>
                )
            }}
        </Formik>
    );
};

export default FormSignUp;