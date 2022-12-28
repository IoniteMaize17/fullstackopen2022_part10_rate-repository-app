import AsyncStorage from '@react-native-async-storage/async-storage';

const ACCESS_TOKEN_SAVED_KEY = 'auth__access_token';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken() {
    return await AsyncStorage.getItem(ACCESS_TOKEN_SAVED_KEY)
    // Get the access token for the storage
  }

  async setAccessToken(accessToken) {
    // Add the access token to the storage
    await AsyncStorage.setItem(ACCESS_TOKEN_SAVED_KEY, accessToken)
  }

  async removeAccessToken() {
    await AsyncStorage.removeItem(ACCESS_TOKEN_SAVED_KEY)
  }
}

export default AuthStorage;