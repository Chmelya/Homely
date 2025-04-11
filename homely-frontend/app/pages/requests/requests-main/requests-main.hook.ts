import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router';
import { RequestsService } from '~/api/services/serviceRequests/serviceRequestsServices';
import type { RequestFilteredParams, SortOrder } from '~/models/requestsList';

export const useSortedRequests = () => {
	const { parameters } = useRequestsSearchParams();

	const { data, isPending } = useQuery({
		queryKey: ['requests', 'sortedList', parameters],
		queryFn: () => RequestsService.getSortedRequests(parameters),
	});

	return { data, isPending };
};

export const useRequestsSearchParams = () => {
	const [searchParams] = useSearchParams();

	const orderBy = searchParams.get('orderBy');
	const sortOrderParam = searchParams.get('sortOrder');
	const sortOrder: SortOrder =
		sortOrderParam !== null ? (sortOrderParam as SortOrder) : 'asc';

	const parameters: RequestFilteredParams = {
		pageNumber: Number(searchParams.get('pageNumber')),
		pageSize: Number(searchParams.get('pageSize')),
		sortColumn: orderBy as string,
		sortOrder: sortOrderParam as SortOrder,
		urgencies: searchParams.getAll('urgencies'),
		categories: searchParams.getAll('categories'),
		statuses: searchParams.getAll('statuses'),
	};

	return { parameters, sortOrder, searchParams, orderBy };
};
