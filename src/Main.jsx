import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';

import RepositoryList from './components/RepositoryList';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import SingleRepository from './components/SingleRepository';
import CreateNewReview from './components/CreateNewReview';
import MyReviews from './components/MyReviews';
import AppBar from './AppBar';
import THEME_CONFIG from './theme';

const styles = StyleSheet.create({
  container: {
    fontFamily: THEME_CONFIG.fonts.main,
    backgroundColor: THEME_CONFIG.colors.whiteLight,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} exact />
        <Route path="/sign-in" element={<SignIn />} exact />
        <Route path="/sign-up" element={<SignUp />} exact />
        <Route path="/create-new-review" element={<CreateNewReview />} exact />
        <Route path="/my-review" element={<MyReviews />} exact />
        <Route path="/repository/:id" element={<SingleRepository is_detail={true} />} exact />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <StatusBar style="auto" />
    </View>
  );
};

export default Main;