import { Container } from '@mui/material';
import { Outlet } from 'react-router';
import { Authorized } from '~/auth/authorized';
import AppBar from '~/components/app-bar/app-bar';

const MainLayout = () => {
	return (
		<Authorized>
			<AppBar />
			<Container>
				<Outlet />
			</Container>
		</Authorized>
	);
};

export default MainLayout;
