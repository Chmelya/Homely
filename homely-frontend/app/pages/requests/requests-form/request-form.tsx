import { Box, Button, MenuItem, Typography } from '@mui/material';
import type { UseFormReturn } from 'react-hook-form';
import FormSelectInput from '~/components/form-components/form-select-input';
import FormTextInput from '~/components/form-components/form-text-input';
import type { ServiceRequestValues } from './request-form.model';
import Form from '~/components/form-components/form';
import CancelRequest from './request-form-cancel';
import CriticalIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import HighIcon from '@mui/icons-material/ExpandLess';
import MediumIcon from '@mui/icons-material/Remove';
import LowIcon from '@mui/icons-material/ExpandMore';
import LowestIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { useMemo, type ReactElement } from 'react';
import type { Dictionary } from '~/models/pairs';
import { useOptionsQuery } from '../requests.hooks';
import { useRole } from '~/auth/authorized';
import { Roles } from '~/auth/permissions';
import { useNavigate } from 'react-router';

const RequestForm = ({
	form,
	cancelHandler,
	submitHandler,
	isButtonsInactive,
	isEditMode,
}: {
	form: UseFormReturn<ServiceRequestValues>;
	cancelHandler: () => void;
	submitHandler: (formData: ServiceRequestValues) => void;
	isButtonsInactive: boolean;
	isEditMode?: boolean;
}) => {
	const { hasAccess: isAdmin } = useRole([Roles.Admin]);
	const { data: options } = useOptionsQuery();
	const navigate = useNavigate();

	const UrgencyIcons = useMemo(() => {
		const urgencyIcons: Dictionary<ReactElement> = {};
		urgencyIcons['1'] = <CriticalIcon />;
		urgencyIcons['2'] = <HighIcon />;
		urgencyIcons['3'] = <MediumIcon />;
		urgencyIcons['4'] = <LowIcon />;
		urgencyIcons['5'] = <LowestIcon />;

		return urgencyIcons;
	}, []);

	if (!options) {
		// TODO: Loader
		return <div>LOAD</div>;
	}

	return (
		<>
			<Typography variant='h4' className='flex justify-center-safe'>
				{isEditMode ? 'Request edit' : 'Create Request'}
			</Typography>
			<Box>
				<Button onClick={() => navigate(-1)}>{'<'} Back</Button>
			</Box>
			<Form form={form} submitHandler={submitHandler}>
				<Box className='grid grid-cols-4 gap-4 mt-10'>
					<FormTextInput
						name={'title'}
						className='col-span-2'
						label='Title'
						variant='outlined'
					/>

					<FormSelectInput
						labelId='status-category-id'
						className='col-span-2'
						name='status'
						label='Status'
						disabled={!isAdmin}
					>
						{options.statuses.map((s) => (
							<MenuItem key={s.key} value={s.key}>
								{s.value}
							</MenuItem>
						))}
					</FormSelectInput>

					<FormSelectInput
						labelId='label-urgency-id'
						className='col-span-2'
						name='urgency'
						label='Urgency'
					>
						{options.urgencies.map((u) => (
							<MenuItem key={u.key} value={u.key}>
								{u.value}
								{UrgencyIcons[u.key]}
							</MenuItem>
						))}
					</FormSelectInput>

					<FormSelectInput
						labelId='label-category-id'
						className='col-span-2'
						name='category'
						label='Category'
					>
						{options.categories.map((c) => (
							<MenuItem key={c.key} value={c.key}>
								{c.value}
							</MenuItem>
						))}
					</FormSelectInput>

					<FormTextInput
						name='description'
						className='col-span-full'
						label='Description'
						variant='outlined'
						multiline
						maxRows={2}
					/>

					{/* TODO: file upload */}
					<Box className='col-span-4 flex justify-end gap-2 mt-20'>
						<CancelRequest
							isButtonsInactive={isButtonsInactive}
							cancelHandler={cancelHandler}
						/>
						<Button
							size='large'
							color='success'
							className='min-w-10'
							variant='contained'
							type='submit'
							fullWidth
							disabled={isButtonsInactive}
							loading={isButtonsInactive}
						>
							Send
						</Button>
					</Box>
				</Box>
			</Form>
		</>
	);
};

export default RequestForm;
