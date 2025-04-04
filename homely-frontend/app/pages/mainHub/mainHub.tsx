import { Box, Button, MenuItem, Select, TextField } from '@mui/material';

export const MainHub = () => {
	return (
		<Box className='grid grid-cols-2 gap-4'>
			<TextField className='col-span-full' label='Title' variant='outlined' />

			<Select label='Urgency'>
				<MenuItem value={10}>Ten</MenuItem>
				<MenuItem value={20}>Twenty</MenuItem>
				<MenuItem value={30}>Thirty</MenuItem>
			</Select>

			<Select label='Category'>
				<MenuItem value={10}>Ten</MenuItem>
				<MenuItem value={20}>Twenty</MenuItem>
				<MenuItem value={30}>Thirty</MenuItem>
			</Select>

			<TextField
				className='col-span-2'
				label='Description'
				variant='outlined'
				multiline
				maxRows={4}
			/>

			{/* TODO: file upload */}

			<Box className='col-2 flex justify-end gap-2'>
				<Button
					size='large'
					color='error'
					className='min-w-10'
					variant='outlined'
					fullWidth
				>
					Cancel
				</Button>
				<Button
					size='large'
					color='success'
					className='min-w-10'
					variant='contained'
					fullWidth
				>
					Send
				</Button>
			</Box>
		</Box>
	);
};
