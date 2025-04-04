import type { JwtPayload } from 'jwt-decode';

export type JwtHomelyPayload = JwtPayload & {
	homely_user_id: number;
	homely_full_name: string;
	homely_email: string;
	homely_permissions: string[];
};
