import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });

const fetchClient = () => {
	const API_URL =
		process.env.REACT_APP_ENVIRONMENT === 'production'
			? 'https://codejedi.xyz'
			: 'http://localhost:4001';
	console.log({ API_URL, ENVIRONMENT: process.env.REACT_APP_ENVIRONMENT });
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
