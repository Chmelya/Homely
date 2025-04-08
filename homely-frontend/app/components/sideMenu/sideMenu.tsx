import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import { Link } from 'react-router';
import { ROUTES } from '~/routes/paths';

export default function SideMenu() {
	const [open, setOpen] = React.useState(false);

	const toggleDrawer = (newOpen: boolean) => () => {
		setOpen(newOpen);
	};

	const DrawerList = (
		<Box sx={{ width: 250 }} role='presentation' onClick={toggleDrawer(false)}>
			<List>
				{/* TODO: Icons */}
				<ListItem component={Link} to={ROUTES.main} disablePadding>
					<ListItemButton>
						<ListItemIcon>
							<InboxIcon />
						</ListItemIcon>
						<ListItemText primary={'Hub'} />
					</ListItemButton>
				</ListItem>
				<ListItem
					component={Link}
					to={ROUTES.requestsMainParams('pageNumber=1&pageSize=10')}
					disablePadding
				>
					<ListItemButton>
						<ListItemIcon>
							<InboxIcon />
						</ListItemIcon>
						<ListItemText primary={'My requests'} />
					</ListItemButton>
				</ListItem>
				<ListItem component={Link} to={ROUTES.createRequest()} disablePadding>
					<ListItemButton>
						<ListItemIcon>
							<InboxIcon />
						</ListItemIcon>
						<ListItemText primary={'Create request'} />
					</ListItemButton>
				</ListItem>
			</List>
		</Box>
	);

	return (
		<>
			<div className='justify-start'>
				<IconButton onClick={toggleDrawer(true)}>
					<MenuIcon />
				</IconButton>
			</div>
			<Drawer open={open} onClose={toggleDrawer(false)}>
				{DrawerList}
			</Drawer>
		</>
	);
}
