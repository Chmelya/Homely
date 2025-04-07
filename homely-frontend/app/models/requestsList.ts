import type { ServiceRequest } from './service-request';

export interface RequestsPaged {
	items: ServiceRequest[];
	pageCount: number;
	pageNumber: number;
	totalCount: number;
}
