import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

import { store } from '../App';

import { logout } from '../store/actions';

// IMPORTANT USAGE NOTES
// Usage:
/*
  axiosWithAuth(axiosInstance => {
    return axiosInstance...
  })
*/
// axiosWithAuth will take a callback function
// that gets an axios instance.
// By using that axios instance to perform a
// request that required authentication, the
// user's token will be included in the header

export default req => {
  return SecureStore.getItemAsync('accessToken')
    .then(token => {
      const instance = axios.create({
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Are we being logged out? If so, take action
      instance.interceptors.response.use(
        response => response,
        error => {
          if(error.response?.data?.logout) {
            store.dispatch(logout(error.response.data.msg));
          }
          return Promise.reject(error);
        }
      );

      return req(instance);
    })
    .catch(err => {
      console.log(err);
    });
};
