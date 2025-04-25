import { Box, Container, Stack } from '@mui/material';
import { useState } from 'react';
import { Outlet } from 'react-router';
import { Authorized } from '~/auth/authorized';
import ApplicationBar from '~/components/app-bar/app-bar';
import SideMenu from '~/components/sideMenu/sideMenu';

const MainLayout = () => {
	return (
		<Authorized>
			<ApplicationBar />
			<Box className='flex'>
				<SideMenu />
				<Container className='mt-20'>
					<Outlet />
				</Container>
			</Box>
		</Authorized>
	);
};

export default MainLayout;
