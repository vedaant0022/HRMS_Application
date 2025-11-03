// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// // Define base URL & version
// // export const base_url = 'http://34.47.223.144:3000/api';
// export const base_url = 'http://192.168.109.1:3000/api';
// const version = 'v1';

// // Get stored token
// const getToken = async () => {
//   return await AsyncStorage.getItem('access_token');
// };

// // Centralized request handler
// const request = async (method, url, { data = {}, params = {}, headers = {} } = {}) => {
//   try {
//     const token = await getToken();
//     const config = {
//       method,
//       url: `${base_url}/${version}${url}`,
//       params,
//       headers: {
//         ...headers,
//         authorization: token ? token : '',
//       },
//     };

//     if (method !== 'GET') {
//       config.data = data;
//     }

//     const response = await axios(config);
//     return response.data; // return only the actual data
//   } catch (err) {
//     console.error(`API ${method} ${url} failed:`, err.response?.data || err.message);
//     throw err;
//   }
// };

// // Method shortcuts
// const get    = (url, options = {}) => request('GET', url, options);
// const post   = (url, options = {}) => request('POST', url, options);
// const put    = (url, options = {}) => request('PUT', url, options);
// const del    = (url, options = {}) => request('DELETE', url, options); // delete is reserved keyword

// export default { get, post, put, delete: del };
