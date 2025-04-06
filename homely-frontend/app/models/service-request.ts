export interface ServiceRequest {
	requestId: number;
	creatorId: number;
	administratorId: number;
	title: string;
	description?: string;
	//TODO: To enum
	urgency: number;
	category: number;
	status: number;
}
