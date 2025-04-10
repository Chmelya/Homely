import {
	Chip,
	IconButton,
	Stack,
	TableCell,
	TableRow,
	Tooltip,
} from '@mui/material';
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
import EastIcon from '@mui/icons-material/East';
import { useRole } from '~/auth/authorized';
import { Roles } from '~/auth/permissions';
import { StatusEnum } from '~/models/statuses';

const TableBodyRow = ({
	request,
	options,
}: {
	request: ServiceRequest;
	options: ServiceRequestOptions;
}) => {
	const { hasAccess: isAdmin } = useRole([Roles.Admin]);

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
				<Chip label={request.statusName} color='default' />
			</TableCell>
			<TableCell align='center'>{request.categoryName}</TableCell>
			<TableCell align='center'>
				{new Date(request.createdDate).toLocaleDateString()}
			</TableCell>
			<TableCell align='center'>
				<Tooltip title={request.urgencyName} placement='right'>
					{UrgencyIcons[request.urgencyId]}
				</Tooltip>
			</TableCell>
			<TableCell align='right'>
				<Stack direction='row' justifyContent='end'>
					<Tooltip title='Edit request' placement='left'>
						<IconButton
							component={Link}
							to={ROUTES.editRequest(request.requestId)}
						>
							<EditIcon color='info' />
						</IconButton>
					</Tooltip>
					{isAdmin &&
						(request.statusId === StatusEnum.InProgress ||
							request.statusId === StatusEnum.Created) && (
							<Tooltip title='Process request' placement='left'>
								<IconButton
									component={Link}
									to={ROUTES.processRequest(request.requestId)}
								>
									<EastIcon color='info' />
								</IconButton>
							</Tooltip>
						)}
				</Stack>
			</TableCell>
		</TableRow>
	);
};

export default TableBodyRow;
