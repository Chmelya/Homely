import { MainHub } from '~/pages/mainHub/mainHub';
import type { Route } from './+types/mainPage';

export function meta({}: Route.MetaArgs) {
	return [{ title: 'Homely' }];
}

export default function MainPage() {
	return <MainHub />;
}
