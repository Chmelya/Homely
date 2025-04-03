import axios from 'axios';
import { store } from '~/store/store';

const apiClient = axios.create({
	baseURL: `${process.env.REACT_APP_BASE_URL}/api`,
});

apiClient.interceptors.request.use((config) => {
	const { auth } = store.getState();

	const accessToken = auth?.authToken?.access_token;
	if (accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`;
	}

	return config;
});

export default apiClient;
