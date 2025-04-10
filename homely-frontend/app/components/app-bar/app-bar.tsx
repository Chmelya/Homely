import { Avatar, Box, Stack, Typography } from '@mui/material';
import SideMenu from '../sideMenu/sideMenu';
import { useAppSelector } from '~/store/hooks/store-hooks';
import { authSlice } from '~/store/auth/auth-slice';

export default function AppBar() {
	const user = useAppSelector(authSlice.selectors.user)!;

	return (
		// TODO: To AppBar
		<Box className='grid grid-cols-3 p-4  bg-pink-400 dark:bg-pink-950 text-pink-100 dark:text-pink-50 '>
			<SideMenu />
			<Typography className='flex justify-center items-center' variant='h5'>
				Homely
			</Typography>
			<Stack
				direction='row'
				spacing={2}
				alignItems='center'
				justifyContent='flex-end'
			>
				<Avatar />
				<Stack className='text-sm' direction='column'>
					<Box>{user.name}</Box>
					<Box>{user.email}</Box>
				</Stack>
			</Stack>
		</Box>
	);
}
