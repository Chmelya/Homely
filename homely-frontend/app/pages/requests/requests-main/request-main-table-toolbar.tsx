import {
	Box,
	Button,
	FormControl,
	IconButton,
	InputLabel,
	ListItemText,
	Menu,
	MenuItem,
	Select,
	Stack,
	Toolbar,
	Tooltip,
	Typography,
	type SelectChangeEvent,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import type { ServiceRequestOptions } from '~/models/serviceRequestOptions';
import { useState } from 'react';
import type { DropdownValue } from '~/models/dropdownValue';
import { useNavigate } from 'react-router';
import { ROUTES } from '~/routes/paths';

// TODO: Menu to separate component
const TableToolbar = ({ options }: { options: ServiceRequestOptions }) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const isOpened = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const navigate = useNavigate();

	const applyHandler = () => {
		handleClose();
	};

	const resetHandler = () => {
		handleClose();
		navigate(ROUTES.requestsMainDefault());
	};

	return (
		<Toolbar className='bg-pink-400'>
			<Stack
				direction='row'
				justifyContent='space-between'
				alignItems='center'
				width='100%'
			>
				<Typography className='' variant='h5'>
					My Requests
				</Typography>
				<Tooltip title={'Filter list'}>
					<IconButton onClick={handleClick}>
						<FilterListIcon />
					</IconButton>
				</Tooltip>
				<Menu open={isOpened} anchorEl={anchorEl} onClose={handleClose}>
					<Box className='p-4 min-w-120'>
						<Stack direction='column' gap={2}>
							<MenuSelect items={options.statuses} label='Statuses' />
							<MenuSelect items={options.categories} label='Categories' />
							<MenuSelect items={options.urgencies} label='Urgencies' />
						</Stack>
						<Stack className='mt-4' direction='row' gap={2}>
							<Button onClick={resetHandler} fullWidth variant='outlined'>
								Reset
							</Button>
							<Button onClick={applyHandler} fullWidth variant='contained'>
								Apply
							</Button>
						</Stack>
					</Box>
				</Menu>
			</Stack>
		</Toolbar>
	);
};

export default TableToolbar;

const MenuSelect = ({
	items,
	label,
}: {
	items: DropdownValue[];
	label: string;
}) => {
	const [selectedItems, setSelectedItems] = useState<string[]>([]);

	const handleChange = (event: SelectChangeEvent<typeof selectedItems>) => {
		const {
			target: { value },
		} = event;
		setSelectedItems(typeof value === 'string' ? value.split(',') : value);
	};

	return (
		<Stack direction='row' alignItems='center'>
			<FormControl fullWidth>
				<InputLabel id={`${label}-input-label`}>{label}</InputLabel>
				<Select
					labelId={`${label}-multiply-select-label`}
					id={`${label}-multiply-select`}
					size='small'
					fullWidth
					multiple
					value={selectedItems}
					onChange={handleChange}
					renderValue={(selected) => selected.join(', ')}
				>
					{items.map((item) => (
						<MenuItem key={item.key} value={item.value}>
							{/* <Checkbox /> */}
							<ListItemText>{item.value}</ListItemText>
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</Stack>
	);
};
