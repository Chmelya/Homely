import type { ServiceRequest } from '~/models/service-request';
import apiClient from '../../apiClient';
import type {
	PaginatedRequestParams,
	PaginatedResponse,
} from '~/models/requestsList';
import type { ServiceRequestOptions } from '~/models/serviceRequestOptions';

export class RequestsService {
	static createRequest = async (serviceRequest: ServiceRequest) => {
		var res = await apiClient.post('/serviceRequest', serviceRequest);
		return res;
	};

	static getRequest = async (requestId: number) => {
		var res = await apiClient.get<ServiceRequest>(
			`/serviceRequest/${requestId}`
		);
		return res.data;
	};

	static getOptions = async () => {
		var res = await apiClient.get<ServiceRequestOptions>(
			`/serviceRequest/options`
		);
		return res.data;
	};

	static getSortedRequests = async (params: PaginatedRequestParams) => {
		var res = await apiClient.get<PaginatedResponse<ServiceRequest>>(
			`/serviceRequest/sortedList`,
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

	static editRequestOwner = async (serviceRequest: ServiceRequest) => {
		var res = await apiClient.patch(
			`/ServiceRequest/${serviceRequest.requestId}/owner`,
			serviceRequest
		);
		return res.data;
	};
}
