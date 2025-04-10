export interface ServiceRequest {
	requestId: number;
	creatorId: number;
	administratorId: number;
	title: string;
	description?: string | null;
	urgencyId: number;
	urgencyName: number;
	categoryId: number;
	categoryName: number;
	statusId: number;
	statusName: number;
	createdDate: Date;
}
