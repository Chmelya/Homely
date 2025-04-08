import { useQuery } from '@tanstack/react-query';
import queryString from 'query-string';
import { useLocation, useSearchParams } from 'react-router';
import { RequestsService } from '~/api/services/serviceRequests/serviceRequestsServices';
import type { PaginatedRequestParams, SortOrder } from '~/models/requestsList';

export const useSortedRequests = () => {
	const location = useLocation();
	const queryParams = queryString.parse(location.search);

	const [searchParams] = useSearchParams();

	if (queryParams.pageSize) {
		searchParams.set('pageSize', queryParams.pageSize.toString());
	}
	if (queryParams.pageNumber) {
		searchParams.set('pageNumber', queryParams.pageNumber.toString());
	}
	if (queryParams.orderBy) {
		searchParams.set('orderBy', queryParams.orderBy.toString());
	}
	if (queryParams.sortOrder) {
		searchParams.set('sortOrder', queryParams.sortOrder.toString());
	}

	const orderBy = queryParams.orderBy?.toString();
	const sortOrder: SortOrder =
		queryParams.sortOrder !== undefined
			? (queryParams.sortOrder as SortOrder)
			: 'asc';

	const parameters: PaginatedRequestParams = {
		pageNumber: Number(queryParams.pageNumber),
		pageSize: Number(queryParams.pageSize),
		sortColumn: queryParams.orderBy?.toString(),
		sortOrder: queryParams.sortOrder as SortOrder,
	};

	const { data, isPending } = useQuery({
		queryKey: ['requests', 'sortedList', parameters],
		queryFn: () => RequestsService.getPagedRequestsParams(parameters),
	});

	return { data, isPending, searchParams, orderBy, sortOrder };
};
