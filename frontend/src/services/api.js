import axios from 'axios';
require('dotenv').config({ path: '../../.env' });

const fetchClient = () => {
	const API_URL =
		process.env.NODE_ENV === 'production'
			? 'https://codejedi.xyz'
			: 'http://localhost:4001';
	console.log({ API_URL, NODE_ENV: process.env.NODE_ENV });
	const defaultOptions = {
		baseURL: API_URL,
		method: 'get',
		headers: {
			'Content-Type': 'application/json',
		},
	};

	// Create instance
	const instance = axios.create(defaultOptions);

	// Set the AUTH token for any request
	instance.interceptors.request.use((config) => {
		const tokens = localStorage.getItem('tokens');
		if (tokens && tokens !== 'undefined') {
			const parsed = JSON.parse(tokens);
			config.headers.Authorization = parsed.token
				? `Bearer ${parsed.token}`
				: '';
		}
		return config;
	});

	return instance;
};

export default fetchClient();
