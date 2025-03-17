// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage'


// const base_url = 'http://13.202.242.247:3004/'
// const version = 'v1'


// const getToken = async () => {
// 	const token = await AsyncStorage.getItem('access_token')
// 	return token;
// }


// const get = async (url, data = {}, params = {}, headers = {}) => {
// 	try {
// 		const token = await getToken()
// 		headers['authorization'] = token
// 		console.log(headers)
// 		const response = await axios({
// 			method: 'GET',
// 			params: params,
// 			headers: headers,
// 			url: base_url + version + url,
// 		});
// 		return response;
// 	} 
// 	catch (err) {
// 		throw err; // Rethrow the error to propagate it to the caller
// 	}
// };


// const post = async (url, data = {}, params = {}, headers = {}) => {
// 	console.log(base_url + version + url)
// 	try {
// 		const token = await getToken()
// 		headers['authorization'] = token
// 		const response = await axios({
// 			method: 'POST',
// 			data: data,
// 			params: params,
// 			headers: headers,
// 			url: base_url + version + url,
// 		})
// 		return response;
// 	} 
// 	catch (err) {
// 		throw err; // Rethrow the error to propagate it to the caller
// 	}
// };


// module.exports = {
// 	post: post,
// 	get: get
// }