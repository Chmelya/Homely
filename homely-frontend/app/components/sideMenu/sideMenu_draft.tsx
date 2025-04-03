import * as React from 'react';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, styled, type CSSObject, type Theme } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
	width: drawerWidth,
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: 'hidden',
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up('sm')]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	padding: theme.spacing(0, 1),
	...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: 'nowrap',
	boxSizing: 'border-box',
	variants: [
		{
			props: ({ open }) => open,
			style: {
				...openedMixin(theme),
				'& .MuiDrawer-paper': openedMixin(theme),
			},
		},
		{
			props: ({ open }) => !open,
			style: {
				...closedMixin(theme),
				'& .MuiDrawer-paper': closedMixin(theme),
			},
		},
	],
}));

export default function SideMenu() {
	const [open, setOpen] = React.useState(false);

	const toggleDrawer = (newOpen: boolean) => () => {
		setOpen(newOpen);
	};

	const DrawerList = (
		<List>
			<ListItem disablePadding sx={{ display: 'block' }}>
				<ListItemButton
					className={`${open ? 'opacity-100' : 'justify-center'}`}
					//className={'justify-center'}
					// sx={[
					// 	{
					// 		minHeight: 48,
					// 		px: 2.5,
					// 	},
					// 	// open
					// 	// 	? {
					// 	// 			justifyContent: 'initial',
					// 	// 	  }
					// 	// 	: {
					// 	// 			justifyContent: 'center',
					// 	// 	  },
					// ]}
				>
					<ListItemIcon
						className={`min-w-0 justify-center ${open ? 'mr-4' : 'mr-auto'}`}
					>
						<InboxIcon />
					</ListItemIcon>
					<ListItemText
						primary={'Button text'}
						className={`${open ? 'opacity-100' : 'opacity-0'}`}
					/>
				</ListItemButton>
			</ListItem>
		</List>
	);

	return (
		<>
			<Drawer variant='permanent' open={open} onClose={toggleDrawer(false)}>
				<DrawerHeader>
					<IconButton onClick={toggleDrawer(!open)}>
						{open ? <ChevronLeftIcon /> : <MenuIcon />}
					</IconButton>
				</DrawerHeader>
				<Divider />
				{DrawerList}
			</Drawer>
		</>
	);
}
