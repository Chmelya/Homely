import { Box, Button, IconButton, Menu, Stack, Tooltip } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import type { ServiceRequestOptions } from '~/models/serviceRequestOptions';
import { ROUTES } from '~/routes/paths';
import FilterListIcon from '@mui/icons-material/FilterList';
import MenuSelect from './request-main-table-filter-menu-item';
const FilterMenu = ({
	options,
	searchParams,
}: {
	options: ServiceRequestOptions;
	searchParams: URLSearchParams;
}) => {
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
		navigate(ROUTES.requestsMain(searchParams.toString()));
	};

	const resetHandler = () => {
		handleClose();
		navigate(ROUTES.requestsMainDefault());
	};

	return (
		<>
			<Tooltip title={'Filter list'}>
				<IconButton onClick={handleClick}>
					<FilterListIcon />
				</IconButton>
			</Tooltip>
			<Menu open={isOpened} anchorEl={anchorEl} onClose={handleClose}>
				<Box className='p-4 min-w-120'>
					<Stack direction='column' gap={2}>
						<MenuSelect
							items={options.statuses}
							label='Statuses'
							id='statuses'
							searchParams={searchParams}
						/>
						<MenuSelect
							items={options.categories}
							label='Categories'
							id='categories'
							searchParams={searchParams}
						/>
						<MenuSelect
							items={options.urgencies}
							label='Urgencies'
							id='urgencies'
							searchParams={searchParams}
						/>
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
		</>
	);
};

export default FilterMenu;
