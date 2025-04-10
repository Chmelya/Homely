import {
	Box,
	Checkbox,
	IconButton,
	ListItemText,
	Menu,
	MenuItem,
	Paper,
	Select,
	Stack,
	Toolbar,
	Tooltip,
	Typography,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import type { ServiceRequestOptions } from '~/models/serviceRequestOptions';
import { useState } from 'react';

const TableToolbar = ({ options }: { options: ServiceRequestOptions }) => {
	const [isMenuOpened, setIsMenuOpened] = useState(false);

	return (
		<Toolbar className='bg-pink-400'>
			<Stack
				direction='row'
				justifyContent='space-between'
				alignItems='center'
				width='100%'
			>
				<Typography className='' variant='h5'>
					My Requests
				</Typography>
				<Tooltip title='Filter list'>
					<IconButton onClick={() => setIsMenuOpened(true)}>
						<Menu open={isMenuOpened}>
							{/* <MenuItem>
								<ListItemText>Categories</ListItemText>
							</MenuItem>
							<MenuItem>
								<ListItemText>Urgencies</ListItemText>
							</MenuItem>
							<MenuItem>
								<ListItemText>Statuses</ListItemText>
							</MenuItem> */}
							<Paper className='p-4 min-w-120'>
								<Stack direction='column' gap={2}>
									<Stack direction='row' alignItems='center' gap={2}>
										<ListItemText className='min-w-4'>Categories:</ListItemText>
										<Select
											labelId='demo-multiple-checkbox-label'
											id='demo-multiple-checkbox'
											fullWidth
											//multiple
											// value={personName}
											// onChange={handleChange}
											// input={<OutlinedInput label='Tag' />}
											// renderValue={(selected) => selected.join(', ')}
											// MenuProps={MenuProps}
										>
											{options.categories.map((c) => (
												<MenuItem key={c.key} value={c.key}>
													<Checkbox />
													<ListItemText>{c.value}</ListItemText>
												</MenuItem>
											))}
										</Select>
									</Stack>
									<Stack direction='row' alignItems='center'>
										<ListItemText>Urgencies: </ListItemText>
										<Select
											labelId='demo-multiple-checkbox-label'
											id='demo-multiple-checkbox'
											fullWidth
											//multiple
											// value={personName}
											// onChange={handleChange}
											// input={<OutlinedInput label='Tag' />}
											// renderValue={(selected) => selected.join(', ')}
											// MenuProps={MenuProps}
										>
											{options.urgencies.map((u) => (
												<MenuItem key={u.key} value={u.key}>
													<Checkbox />
													<ListItemText>{u.value}</ListItemText>
												</MenuItem>
											))}
										</Select>
									</Stack>
									<Stack direction='row' alignItems='center'>
										<ListItemText>Statuses: </ListItemText>
										<Select
											labelId='demo-multiple-checkbox-label'
											id='demo-multiple-checkbox'
											fullWidth
											//multiple
											// value={personName}
											// onChange={handleChange}
											// input={<OutlinedInput label='Tag' />}
											// renderValue={(selected) => selected.join(', ')}
											// MenuProps={MenuProps}
										>
											{options.statuses.map((s) => (
												<MenuItem key={s.key} value={s.key}>
													<Checkbox />
													<ListItemText>{s.value}</ListItemText>
												</MenuItem>
											))}
										</Select>
									</Stack>
								</Stack>
							</Paper>
						</Menu>
						<FilterListIcon />
					</IconButton>
				</Tooltip>
			</Stack>
		</Toolbar>
	);
};

export default TableToolbar;
