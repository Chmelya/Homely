export interface ServiceRequest {
	userId: number;
	title: string;
	description?: string;
	//TODO: To enum
	urgency: number;
	category: number;
	status: number;
}
