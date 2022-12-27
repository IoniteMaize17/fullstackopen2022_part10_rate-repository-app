import { StyleSheet } from 'react-native';
import { useField } from 'formik';
import THEME_CONFIG from '../../theme';

import TextInput from './TextInput';
import { Text } from 'react-native';

const styles = StyleSheet.create({
  errorText: {
    marginBottom: THEME_CONFIG.size.padding,
    color: THEME_CONFIG.colors.error
  },
});


const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <>
      <TextInput
         style={{
            borderWidth: 0.5,
            marginBottom: THEME_CONFIG.size.padding,
            paddingHorizontal: THEME_CONFIG.size.padding,
            paddingVertical: THEME_CONFIG.size.padding / 2,
            borderRadius: 5,
            borderColor: showError ? THEME_CONFIG.colors.error : THEME_CONFIG.colors.textSecondary
        }}
        onChangeText={value => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

export default FormikTextInput;