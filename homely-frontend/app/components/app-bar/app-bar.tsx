import {
	AppBar,
	Avatar,
	Box,
	IconButton,
	Menu,
	MenuItem,
	Stack,
	Toolbar,
	Typography,
} from '@mui/material';
import SideMenu from '../sideMenu/sideMenu';
import { useAppSelector } from '~/store/hooks/store-hooks';
import { authSlice } from '~/store/auth/auth-slice';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useThemeContext } from '~/theme-context';

export default function ApplicationBar() {
	const user = useAppSelector(authSlice.selectors.user)!;

	const { mode, toggleTheme } = useThemeContext();

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const isOpen = Boolean(anchorEl);
	const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const dispatch = useDispatch();
	const signOutHandler = () => dispatch(authSlice.actions.signOut());

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position='static'>
				<Toolbar>
					<SideMenu />
					<Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
						Homely
					</Typography>
					<Stack
						direction='row'
						spacing={2}
						alignItems='center'
						justifyContent='flex-end'
					>
						<Stack className='text-sm' direction='column'>
							<Box>{user.name}</Box>
							<Box>{user.email}</Box>
						</Stack>
						<IconButton onClick={handleOpen}>
							<Avatar />
						</IconButton>
						<Menu
							className='mt-5'
							id='menu-appbar'
							anchorEl={anchorEl}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={isOpen}
							onClose={handleClose}
						>
							<MenuItem disabled>
								<Typography sx={{ textAlign: 'center' }}>Profile</Typography>
							</MenuItem>
							<MenuItem onClick={toggleTheme}>
								{mode === 'light' ? <Brightness4 /> : <Brightness7 />}
							</MenuItem>
							<MenuItem onClick={signOutHandler}>
								<Typography sx={{ textAlign: 'center' }}>Sign Out</Typography>
							</MenuItem>
						</Menu>
					</Stack>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
