export interface PaginatedResponse<T> {
	items: T[];
	pageCount: number;
	pageNumber: number;
	totalCount: number;
}

export interface SortRequestParams {
	sortColumn?: string;
	sortOrder?: 'asc' | 'desc';
}

export interface PaginatedRequestParams extends SortRequestParams {
	pageNumber: number;
	pageSize: number;
}
