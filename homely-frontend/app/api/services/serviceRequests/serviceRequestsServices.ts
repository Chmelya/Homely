import type { ServiceRequest } from '~/models/service-request';
import apiClient from '../../apiClient';

export class RequestsService {
	static sendRequest = async (serviceRequest: ServiceRequest) => {
		var res = await apiClient.post('/ServiceRequest', serviceRequest);
		return res;
	};
}
