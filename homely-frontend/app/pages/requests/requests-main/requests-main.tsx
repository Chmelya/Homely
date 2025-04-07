import {
	Box,
	Chip,
	Container,
	IconButton,
	Pagination,
	PaginationItem,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Tooltip,
	Typography,
} from '@mui/material';
import CriticalIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import HighIcon from '@mui/icons-material/ExpandLess';
import MediumIcon from '@mui/icons-material/Remove';
import LowIcon from '@mui/icons-material/ExpandMore';
import LowestIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import EditIcon from '@mui/icons-material/Edit';
import { RequestsService } from '~/api/services/serviceRequests/serviceRequestsServices';
import type { Route } from './+types/requests-main';
import type { ServiceRequest } from '~/models/service-request';
import { CategoryEnum } from '~/models/categories';
import { RequestStatuses, Urgencies, type Dictionary } from '~/models/pairs';
import { useMemo, type ReactElement } from 'react';
import { ROUTES } from '~/routes/paths';
import { Link } from 'react-router';
import type { RequestsPaged } from '~/models/requestsList';

export async function clientLoader({ params }: Route.LoaderArgs) {
	// console.log(params);

	// const url = new URL(params.query);
	// const pageNumber = url.searchParams.get('pageNumber');

	const request = await RequestsService.getPagedRequests(
		Number(params.pageNumber),
		10
	);
	return request;
}

const RequestsMainPage = ({ loaderData }: Route.ComponentProps) => {
	if (loaderData === undefined) {
		return null;
	}

	const data = loaderData as RequestsPaged;

	const requests = data.items;

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
		<Box>
			<Container className='flex justify-center mt-6'>
				<Typography className='' variant='h4'>
					My Requests
				</Typography>
			</Container>

			<TableContainer component={Paper} elevation={3} className='px-2.5 mt-6'>
				<Table size='small'>
					<TableHead className='bg-pink-400 '>
						<TableRow>
							<TableCell align='left' className='min-w-18'>
								Title
							</TableCell>
							<TableCell align='center' width={90}>
								Status
							</TableCell>

							<TableCell align='center'>Category</TableCell>
							<TableCell align='center' width={90}>
								Urgency
							</TableCell>
							<TableCell align='right' width={36}></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{requests.map((req) => (
							<TableRow>
								<TableCell align='left'>{req.title}</TableCell>
								<TableCell align='center'>
									<Chip label={RequestStatuses[req.status]} color='default' />
								</TableCell>
								<TableCell align='center'>
									{CategoryEnum[req.category]}
								</TableCell>{' '}
								<TableCell align='center'>
									<Tooltip title={Urgencies[req.urgency]} placement='right'>
										{UrgencyIcons[req.urgency]}
									</Tooltip>
								</TableCell>
								<TableCell align='right'>
									<Tooltip title='Edit request' placement='left'>
										<IconButton
											component={Link}
											to={ROUTES.editRequest(req.requestId)}
										>
											<EditIcon color='info' />
										</IconButton>
									</Tooltip>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>

			<Container className='flex justify-center mt-6'>
				<Pagination
					count={data.pageCount}
					page={data.pageNumber}
					renderItem={(item) => (
						<PaginationItem
							component={Link}
							to={ROUTES.requestsMain(Number(item.page))}
							{...item}
						/>
					)}
				/>
			</Container>
		</Box>
	);
};

export default RequestsMainPage;
