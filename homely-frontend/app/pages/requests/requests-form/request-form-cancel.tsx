import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	Stack,
} from '@mui/material';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

const CancelRequest = ({
	isButtonsInactive,
	cancelHandler,
}: {
	isButtonsInactive: boolean;
	cancelHandler: () => void;
}) => {
	const [isModalOpen, setModalOpened] = useState(false);

	return (
		<>
			<Button
				size='large'
				color='error'
				className='min-w-10'
				variant='outlined'
				fullWidth
				disabled={isButtonsInactive}
				loading={isButtonsInactive}
				onClick={() => setModalOpened(true)}
			>
				Cancel
			</Button>
			<Dialog open={isModalOpen}>
				<DialogTitle>Are you sure?</DialogTitle>{' '}
				<IconButton
					aria-label='close'
					onClick={() => setModalOpened(false)}
					disabled={isButtonsInactive}
					sx={{
						position: 'absolute',
						right: 4,
						top: 8,
					}}
				>
					<CloseIcon />
				</IconButton>
				<DialogContent>
					Your changes will be lost. You will be returned on previous page
				</DialogContent>
				<DialogActions className='flex justify-center items-center'>
					<Stack direction='row' gap={2}>
						<Button
							size='medium'
							color='primary'
							variant='outlined'
							fullWidth
							disabled={isButtonsInactive}
							loading={isButtonsInactive}
							onClick={() => setModalOpened(false)}
						>
							Close
						</Button>
						<Button
							size='medium'
							color='error'
							variant='contained'
							type='submit'
							fullWidth
							disabled={isButtonsInactive}
							loading={isButtonsInactive}
							onClick={cancelHandler}
						>
							Cancel
						</Button>
					</Stack>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default CancelRequest;
