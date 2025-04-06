import {
	Box,
	Chip,
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

const RequestsMainPage = () => {
	return (
		<Box>
			<Typography className='' variant='h4'>
				My Requests
			</Typography>

			<TableContainer component={Paper} elevation={3}>
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
						<TableRow>
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
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};

export default RequestsMainPage;
