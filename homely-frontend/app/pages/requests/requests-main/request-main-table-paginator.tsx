import { TablePagination } from '@mui/material';
import type { NavigateFunction } from 'react-router';
import { ROUTES } from '~/routes/paths';

const TablePaginator = ({
	searchParams,
	totalCount,
	pageNumber,
	navigate,
}: {
	searchParams: URLSearchParams;
	totalCount: number;
	pageNumber: number;
	navigate: NavigateFunction;
}) => {
	return (
		<TablePagination
			rowsPerPageOptions={[5, 10, 25]}
			component='div'
			count={totalCount}
			rowsPerPage={Number(searchParams.get('pageSize'))}
			page={pageNumber - 1}
			onPageChange={(event, value) => {
				searchParams.set('pageNumber', (value + 1).toString());
				navigate(ROUTES.requestsMain(searchParams.toString()));
			}}
			onRowsPerPageChange={(event) => {
				searchParams.set('pageSize', event.target.value.toString());
				searchParams.set('pageNumber', (1).toString());

				navigate(ROUTES.requestsMain(searchParams.toString()));
			}}
		/>
	);
};

export default TablePaginator;
