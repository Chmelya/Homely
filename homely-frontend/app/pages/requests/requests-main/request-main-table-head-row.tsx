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
			width: 120,
		},
		{
			label: 'Status',
			id: 'status',
			align: 'center',
			width: 90,
		},
		{
			label: 'Category',
			id: 'category',
			align: 'center',
			width: 100,
		},
		{
			label: 'Urgency',
			id: 'urgency',
			align: 'center',
			width: 90,
		},
	];

	const onCellClick = (id: string) => {
		searchParams.set('pageNumber', (1).toString());

		const sortOrderNew = sortOrder === 'asc' ? 'desc' : 'asc';
		searchParams.set('orderBy', id);
		searchParams.set('sortOrder', sortOrderNew);

		navigate(ROUTES.requestsMainParams(searchParams.toString()));
	};

	return (
		<TableRow>
			{headCells.map((headCell) => (
				<TableCell
					key={headCell.id}
					align={headCell.align}
					width={headCell?.width}
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
			<TableCell align='right' width={36}></TableCell>
		</TableRow>
	);
};

export default TableHeadRow;
