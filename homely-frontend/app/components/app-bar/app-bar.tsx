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
import { useAppSelector } from '~/store/hooks/store-hooks';
import { authSlice } from '~/store/auth/auth-slice';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function ApplicationBar() {
	const user = useAppSelector(authSlice.selectors.user)!;

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
		<AppBar position='static'>
			<Toolbar>
				<Typography
					variant='h6'
					component='div'
					sx={{ flexGrow: 1, marginLeft: '10px' }}
				>
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
						<MenuItem onClick={signOutHandler}>
							<Typography sx={{ textAlign: 'center' }}>Sign Out</Typography>
						</MenuItem>
					</Menu>
				</Stack>
			</Toolbar>
		</AppBar>
	);
}
