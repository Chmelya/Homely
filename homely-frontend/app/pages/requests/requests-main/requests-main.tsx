import {
	Box,
	Container,
	Paper,
	Table,
	TableBody,
	TableContainer,
	TableHead,
	Typography,
} from '@mui/material';

import { useNavigate } from 'react-router';
import { useSortedRequests } from './requests-main.hook';
import TablePaginator from './request-main-table-paginator';
import TableHeadRow from './request-main-table-head-row';
import TableBodyRow from './request-main-table-body-row';

const RequestsMainPage = () => {
	const navigate = useNavigate();

	const { data, isPending, searchParams, orderBy, sortOrder } =
		useSortedRequests();

	return (
		<Box>
			<Container className='flex justify-center mt-6'>
				<Typography className='' variant='h4'>
					My Requests
				</Typography>
			</Container>

			{/* TODO: Skeleton on load */}
			<TableContainer component={Paper} elevation={3} className=' mt-6'>
				<Table size='small'>
					<TableHead className='bg-pink-400 '>
						<TableHeadRow
							sortOrder={sortOrder}
							orderBy={orderBy}
							searchParams={searchParams}
							navigate={navigate}
						/>
					</TableHead>
					{!isPending && data && (
						<TableBody>
							{data.items.map((request) => {
								return <TableBodyRow request={request} />;
							})}
						</TableBody>
					)}
				</Table>
				{!isPending && data && (
					<TablePaginator
						searchParams={searchParams}
						totalCount={data.totalCount}
						pageNumber={data.pageNumber}
						navigate={navigate}
					/>
				)}
			</TableContainer>
		</Box>
	);
};

export default RequestsMainPage;
