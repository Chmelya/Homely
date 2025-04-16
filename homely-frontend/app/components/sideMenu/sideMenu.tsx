import * as React from 'react';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MenuIcon from '@mui/icons-material/Menu';
import {
	Box,
	IconButton,
	styled,
	Switch,
	useTheme,
	type CSSObject,
	type Theme,
} from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useThemeContext } from '~/theme-context';
import {
	LightMode as LightIcon,
	DarkMode as DarkIcon,
	Create as CreateIcon,
	ListAlt as ListIcon,
} from '@mui/icons-material';
import { Link } from 'react-router';
import { ROUTES } from '~/routes/paths';

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
	width: `calc(${theme.spacing(7)} + 1px)`,
	overflowX: 'hidden',
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
});

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

interface ItemModel {
	text: string;
	to: string;
	icon: React.ReactNode;
}

const items: readonly ItemModel[] = [
	{ text: 'Hub', to: ROUTES.main, icon: <InboxIcon /> },
	{ text: 'My Requests', to: ROUTES.requestsMainDefault(), icon: <ListIcon /> },
	{ text: 'Create Request', to: ROUTES.createRequest(), icon: <CreateIcon /> },
];

export default function SideMenu() {
	const [open, setOpen] = React.useState(false);
	const theme = useTheme();

	const { mode, toggleTheme } = useThemeContext();

	const toggleDrawer = (newOpen: boolean) => () => {
		setOpen(newOpen);
	};

	const DrawerList = (
		<List>
			{items.map((item) => (
				<ListItem component={Link} to={item.to} disablePadding>
					<ListItemButton className='gap-2'>
						<ListItemIcon className='min-w-0!'>{item.icon}</ListItemIcon>
						<ListItemText
							primary={item.text}
							sx={{
								opacity: open ? '1' : '0',
								transition: theme.transitions.create('opacity', {
									easing: theme.transitions.easing.sharp,
									duration: theme.transitions.duration.leavingScreen,
								}),
							}}
						/>
					</ListItemButton>
				</ListItem>
			))}
		</List>
	);

	return (
		<>
			<Drawer variant='permanent' open={open} onClose={toggleDrawer(false)}>
				<Box
					className='flex items-center justify-end p-2 min-h-[64px]'
					sx={{ background: 'primary.main' }}
				>
					<IconButton onClick={toggleDrawer(!open)}>
						{open ? <ChevronLeftIcon /> : <MenuIcon />}
					</IconButton>
				</Box>
				<Divider />
				{DrawerList}
				<Divider />
				{/* TODO: To theme usage, restyle */}
				<Switch
					size='medium'
					checked={mode !== 'light'}
					onChange={toggleTheme}
					icon={
						<LightIcon
							sx={{ scale: 1.25, color: theme.palette.primary.main }}
							fontSize='small'
						/>
					}
					checkedIcon={
						<DarkIcon
							sx={{ scale: 1.25, color: theme.palette.text.primary }}
							fontSize='small'
						/>
					}
				/>
			</Drawer>
		</>
	);
}
