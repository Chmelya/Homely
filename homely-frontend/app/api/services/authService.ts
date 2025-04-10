import api from '../apiClient';

export class AuthService {
	static signIn = async ({
		email,
		password,
	}: {
		email: string;
		password: string;
	}) => {
		const res = await api.post('/auth/signin', { email, password });
		return res.data;
	};
}
