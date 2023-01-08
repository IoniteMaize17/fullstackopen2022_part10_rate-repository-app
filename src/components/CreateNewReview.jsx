import { View } from 'react-native';
import FormCreateReview from './helpers/FormCreateReview'
import THEME_CONFIG from '../theme';
import { useCreateReview } from '../hooks/useCreateReview';
import { useNavigate } from 'react-router-native';

const CreateNewReview = () => {
    const navigate = useNavigate();
    const [createReview] = useCreateReview();

    const onSubmit = async (values) => {
        const { repositoryName, ownerName, rating, text } = values;
        try {
            const reviewObj = await createReview({ repositoryName, ownerName, rating, text });
            if (reviewObj) {
                navigate(`/repository/${reviewObj.repository.id}`)
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
            <FormCreateReview onSubmit={onSubmit} />
        </View>
    );
};

export default CreateNewReview;