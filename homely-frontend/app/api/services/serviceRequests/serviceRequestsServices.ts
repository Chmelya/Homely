import type { ServiceRequest } from '~/models/service-request';
import apiClient from '../../apiClient';
import type {
	PaginatedRequestParams,
	PaginatedResponse,
} from '~/models/requestsList';

export class RequestsService {
	static createRequest = async (serviceRequest: ServiceRequest) => {
		var res = await apiClient.post('/ServiceRequest', serviceRequest);
		return res;
	};

	static getRequest = async (requestId: number) => {
		var res = await apiClient.get(`/ServiceRequest/${requestId}`);
		return res.data;
	};

	static getPagedRequestsParams = async (params: PaginatedRequestParams) => {
		var res = await apiClient.get<PaginatedResponse<ServiceRequest>>(
			`/ServiceRequest`,
			{
				params,
			}
		);
		return res.data;
	};

	static editRequest = async (serviceRequest: ServiceRequest) => {
		var res = await apiClient.patch(
			`/ServiceRequest/${serviceRequest.requestId}`,
			serviceRequest
		);
		return res.data;
	};
}
