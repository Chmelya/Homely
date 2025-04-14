import { Container } from '@mui/material';
import { Outlet } from 'react-router';
import { Authorized } from '~/auth/authorized';
import ApplicationBar from '~/components/app-bar/app-bar';

const MainLayout = () => {
	return (
		<Authorized>
			<ApplicationBar />
			<Container className='mt-20'>
				<Outlet />
			</Container>
		</Authorized>
	);
};

export default MainLayout;
