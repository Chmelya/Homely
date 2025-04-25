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
import {
	useRequestsSearchParams,
	useSortedRequests,
} from './requests-main.hook';
import TablePaginator from './request-main-table-paginator';
import TableHeadRow from './request-main-table-head-row';
import TableBodyRow from './request-main-table-body-row';
import { useOptionsQuery } from '../requests.hooks';
import TableToolbar from './request-main-table-toolbar';
const RequestsMainPage = () => {
	const navigate = useNavigate();

	const { data } = useSortedRequests();
	const { parameters, searchParams, sortOrder, orderBy } =
		useRequestsSearchParams();
	const { data: options } = useOptionsQuery();

	if (!options || !data) {
		// TODO: LOADER
		return <div>LOAD</div>;
	}

	return (
		<Box>
			{/* TODO: Skeleton on load */}
			<TableContainer component={Paper} elevation={3} className='mt-6'>
				<TableToolbar
					options={options}
					searchParams={searchParams}
				></TableToolbar>
				<Table size='small'>
					<TableHead>
						<TableHeadRow
							sortOrder={sortOrder}
							orderBy={orderBy}
							searchParams={searchParams}
							navigate={navigate}
						/>
					</TableHead>

					<TableBody>
						{data.items.map((request) => {
							return (
								<TableBodyRow
									key={request.requestId}
									request={request}
									options={options}
								/>
							);
						})}
					</TableBody>
				</Table>

				<TablePaginator
					searchParams={searchParams}
					totalCount={data.totalCount}
					pageNumber={data.pageNumber}
					navigate={navigate}
				/>
			</TableContainer>
		</Box>
	);
};

export default RequestsMainPage;
