import { useQuery } from '@tanstack/react-query';
import { RequestsService } from '~/api/services/serviceRequests/serviceRequestsServices';

export const useOptionsQuery = () =>
	useQuery({
		queryKey: ['request', 'options'],
		queryFn: () => RequestsService.getOptions(),
	});
