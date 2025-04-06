import {
	Box,
	Chip,
	ListItemButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material';
import CriticalIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import HighIcon from '@mui/icons-material/ExpandLess';
import MediumIcon from '@mui/icons-material/Remove';
import LowIcon from '@mui/icons-material/ExpandMore';
import LowestIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { RequestsService } from '~/api/services/serviceRequests/serviceRequestsServices';
import type { Route } from './+types/requests-main';
import type { ServiceRequest } from '~/models/service-request';
import { UrgencyEnum } from '~/models/urgency';
import { CategoryEnum } from '~/models/categories';

export async function clientLoader() {
	const request = await RequestsService.getPagedRequests(1, 10);
	return request;
}

const RequestsMainPage = ({ loaderData }: Route.ComponentProps) => {
	if (loaderData === undefined) {
		return null;
	}

	const requests = loaderData.items as ServiceRequest[];

	return (
		<Box>
			<Typography className='' variant='h4'>
				My Requests
			</Typography>

			<TableContainer component={Paper} elevation={3} className='px-2.5'>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Title</TableCell>
							<TableCell align='center'>Status</TableCell>
							<TableCell align='center'>Urgency</TableCell>
							<TableCell align='right'>Category</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{requests.map((req) => (
							<TableRow>
								<TableCell>{req.title}</TableCell>
								<TableCell align='center'>
									<Chip label={req.status} color='default' />
								</TableCell>
								<TableCell align='center'>{UrgencyEnum[req.urgency]}</TableCell>
								<TableCell align='right'>
									{CategoryEnum[req.category]}
								</TableCell>
							</TableRow>
						))}
						{/* <TableRow>
							<TableCell>Title</TableCell>
							<TableCell align='center'>
								<Chip label='Created' color='default' />
							</TableCell>
							<TableCell align='center'>
								<HighIcon />
							</TableCell>
							<TableCell align='right'>Category</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Title</TableCell>
							<TableCell align='center'>
								<Chip label='In progress' color='primary' />
							</TableCell>
							<TableCell align='center'>
								<MediumIcon />
							</TableCell>
							<TableCell align='right'>Category</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Title</TableCell>
							<TableCell align='center'>
								<Chip label='In progress' color='primary' />
							</TableCell>
							<TableCell align='center'>
								<CriticalIcon />
							</TableCell>
							<TableCell align='right'>Category</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Title</TableCell>
							<TableCell align='center'>
								<Chip label='Done' color='success' />
							</TableCell>
							<TableCell align='center'>
								<LowIcon />
							</TableCell>
							<TableCell align='right'>Category</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Title</TableCell>
							<TableCell align='center'>
								<Chip label='Rejected' color='error' />
							</TableCell>
							<TableCell align='center'>
								<LowestIcon />
							</TableCell>
							<TableCell align='right'>Category</TableCell>
						</TableRow> */}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};

export default RequestsMainPage;
