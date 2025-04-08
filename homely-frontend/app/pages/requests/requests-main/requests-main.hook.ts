import { useQuery } from '@tanstack/react-query';
import queryString from 'query-string';
import { useLocation } from 'react-router';
import { RequestsService } from '~/api/services/serviceRequests/serviceRequestsServices';
import type { PaginatedRequestParams } from '~/models/requestsList';

export const useSortedRequests = () => {
	const location = useLocation();
	const queryParams = queryString.parse(location.search);

	const parameters: PaginatedRequestParams = {
		pageNumber: Number(queryParams.pageNumber),
		pageSize: Number(queryParams.pageSize),
	};

	const { data, isPending } = useQuery({
		queryKey: ['requests', 'sortedList', parameters],
		queryFn: () => RequestsService.getPagedRequestsParams(parameters),
	});

	return { data, isPending };
};
