import { Text, View, Pressable } from 'react-native';
import * as yup from 'yup';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import THEME_CONFIG from '../../theme';

const FormCreateReview = ({ onSubmit }) => {
    const validationSchema = yup.object().shape({
        repositoryName: yup
            .string()
            .required('Repository owner username is required'),
        ownerName: yup
            .string()
            .required('Repository name is required'),
        rating: yup
            .number()
            .typeError("Rating must be a number")
            .required('Rating is required')
            .min(0, 'Rating is number between 0 and 100')
            .max(100, 'Rating is number between 0 and 100'),
        text: yup
            .string()
    });
    const initialValues = {
        repositoryName: '',
        ownerName: '',
        rating: '',
        text: ''
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
                        <FormikTextInput name="repositoryName" placeholder="Repository owner username" />
                        <FormikTextInput name="ownerName" placeholder="Repository name" />
                        <FormikTextInput name="rating" placeholder="Rating between 0 and 100" />
                        <FormikTextInput name="text" placeholder="Review" />
                        <Pressable style={{
                            backgroundColor: THEME_CONFIG.colors.primary,
                            borderRadius: 5
                        }} onPress={handleSubmit}>
                            <Text style={{
                                color: THEME_CONFIG.colors.white,
                                textAlign: 'center',
                                padding: THEME_CONFIG.size.padding,
                                fontWeight: THEME_CONFIG.fontWeights.bold
                            }}>Create a review</Text>
                        </Pressable>
                    </View>
                )
            }}
        </Formik>
    );
}

export default FormCreateReview;