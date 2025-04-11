import { Stack, Toolbar, Typography } from '@mui/material';
import type { ServiceRequestOptions } from '~/models/serviceRequestOptions';
import FilterMenu from './request-main-table-filter-menu';

const TableToolbar = ({
	options,
	searchParams,
}: {
	options: ServiceRequestOptions;
	searchParams: URLSearchParams;
}) => {
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
				<FilterMenu options={options} searchParams={searchParams} />
			</Stack>
		</Toolbar>
	);
};

export default TableToolbar;
