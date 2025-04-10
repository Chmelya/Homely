export interface ServiceRequest {
	requestId: number;
	creatorId: number;
	administratorId: number;
	title: string;
	description?: string | null;
	urgencyId: number;
	categoryId: number;
	statusId: number;
	createdDate: Date;
}
