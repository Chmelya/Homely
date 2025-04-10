import { Chip, IconButton, TableCell, TableRow, Tooltip } from '@mui/material';
import { useMemo, type ReactElement } from 'react';
import { Link } from 'react-router';
import { Urgencies, type Dictionary } from '~/models/pairs';
import { ROUTES } from '~/routes/paths';
import EditIcon from '@mui/icons-material/Edit';
import type { ServiceRequest } from '~/models/service-request';
import CriticalIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import HighIcon from '@mui/icons-material/ExpandLess';
import MediumIcon from '@mui/icons-material/Remove';
import LowIcon from '@mui/icons-material/ExpandMore';
import LowestIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import type { ServiceRequestOptions } from '~/models/serviceRequestOptions';

const TableBodyRow = ({
	request,
	options,
}: {
	request: ServiceRequest;
	options: ServiceRequestOptions;
}) => {
	const UrgencyIcons = useMemo(() => {
		const urgencyIcons: Dictionary<ReactElement> = {};
		urgencyIcons['1'] = <CriticalIcon />;
		urgencyIcons['2'] = <HighIcon />;
		urgencyIcons['3'] = <MediumIcon />;
		urgencyIcons['4'] = <LowIcon />;
		urgencyIcons['5'] = <LowestIcon />;

		return urgencyIcons;
	}, []);

	return (
		<TableRow key={request.requestId}>
			<TableCell align='left'>{request.title}</TableCell>
			<TableCell align='center'>
				<Chip
					label={
						options?.statuses.filter((c) => c.key === request.statusId)[0].value
					}
					color='default'
				/>
			</TableCell>
			<TableCell align='center'>
				{
					options?.categories.filter((c) => c.key === request.categoryId)[0]
						.value
				}
			</TableCell>
			<TableCell align='center'>
				{new Date(request.createdDate).toLocaleDateString()}
			</TableCell>
			<TableCell align='center'>
				<Tooltip title={Urgencies[request.urgencyId]} placement='right'>
					{UrgencyIcons[request.urgencyId]}
				</Tooltip>
			</TableCell>
			<TableCell align='right'>
				<Tooltip title='Edit request' placement='left'>
					<IconButton
						component={Link}
						to={ROUTES.editRequest(request.requestId)}
					>
						<EditIcon color='info' />
					</IconButton>
				</Tooltip>
			</TableCell>
		</TableRow>
	);
};

export default TableBodyRow;
