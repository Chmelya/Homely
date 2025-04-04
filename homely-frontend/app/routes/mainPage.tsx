import { MainHub } from '~/pages/mainHub/mainHub';
import type { Route } from './+types/mainPage';
import { AuthorizedPermissions } from '~/auth/authorized-permissions';
import { Authorized } from '~/auth/authorized';

export function meta({}: Route.MetaArgs) {
	return [{ title: 'Homely' }];
}

export default function MainPage() {
	return (
		<Authorized>
			<MainHub />
		</Authorized>
	);
}
