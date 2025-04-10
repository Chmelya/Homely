import { useQuery } from '@tanstack/react-query';
import { RequestsService } from '~/api/services/serviceRequests/serviceRequestsServices';

export const useOptionsQuery = () =>
	useQuery({
		queryKey: ['options', 'request'],
		queryFn: () => RequestsService.getOptions(),
	});

export const useRequestQuery = (requestId: number | string) =>
	useQuery({
		queryKey: ['requests', Number(requestId)],
		queryFn: () => RequestsService.getRequest(Number(requestId)),
	});
