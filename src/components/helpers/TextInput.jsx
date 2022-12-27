/* eslint-disable no-unused-vars */
import { TextInput as NativeTextInput } from 'react-native';


const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [style];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;