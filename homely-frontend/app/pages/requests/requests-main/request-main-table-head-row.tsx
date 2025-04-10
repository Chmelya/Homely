import { TableCell, TableRow, TableSortLabel } from '@mui/material';
import type { NavigateFunction } from 'react-router';
import type { SortOrder } from '~/models/requestsList';
import { ROUTES } from '~/routes/paths';

const TableHeadRow = ({
	searchParams,
	sortOrder,
	navigate,
	orderBy,
}: {
	searchParams: URLSearchParams;
	sortOrder: SortOrder;
	navigate: NavigateFunction;
	orderBy?: string;
}) => {
	interface HeadCell {
		id: string;
		label: string;
		align?: 'left' | 'center' | 'right';
		width?: number;
	}

	const headCells: readonly HeadCell[] = [
		{
			label: 'Title',
			id: 'title',
			align: 'left',
			width: 25,
		},
		{
			label: 'Status',
			id: 'status',
			align: 'center',
			width: 15,
		},
		{
			label: 'Category',
			id: 'category',
			align: 'center',
			width: 15,
		},
		{
			label: 'Date',
			id: 'date',
			align: 'center',
			width: 20,
		},
		{
			label: 'Urgency',
			id: 'urgency',
			align: 'center',
			width: 10,
		},
	];

	const onCellClick = (orderByNew: string) => {
		const sortOrderNew =
			orderBy === orderByNew && sortOrder === 'asc' ? 'desc' : 'asc';

		searchParams.set('pageNumber', (1).toString());
		searchParams.set('orderBy', orderByNew);
		searchParams.set('sortOrder', sortOrderNew);

		navigate(ROUTES.requestsMain(searchParams.toString()));
	};

	return (
		<TableRow>
			{headCells.map((headCell) => (
				<TableCell
					key={headCell.id}
					align={headCell.align}
					width={headCell?.width + '%'}
					sortDirection={orderBy === headCell.id ? sortOrder : false}
				>
					<TableSortLabel
						active={orderBy === headCell.id}
						direction={orderBy === headCell.id ? sortOrder : 'asc'}
						onClick={() => onCellClick(headCell.id)}
					>
						{headCell.label}
					</TableSortLabel>
				</TableCell>
			))}
			<TableCell align='right' width={'5%'}></TableCell>
		</TableRow>
	);
};

export default TableHeadRow;
