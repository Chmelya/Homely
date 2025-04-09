export interface PaginatedResponse<T> {
	items: T[];
	pageCount: number;
	pageNumber: number;
	totalCount: number;
}

export type SortOrder = 'asc' | 'desc';

export interface SortRequestParams {
	sortColumn?: string;
	sortOrder?: SortOrder;
}

export interface PaginatedRequestParams extends SortRequestParams {
	pageNumber: number;
	pageSize: number;
}
