import api from '../axios';

export const getToken = async (email: string, password: string) => {
	return await api.post('/auth/signin');
};
