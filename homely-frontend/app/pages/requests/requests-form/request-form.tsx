import { Box, Button, MenuItem } from '@mui/material';
import type { UseFormReturn } from 'react-hook-form';
import FormSelectInput from '~/components/form-components/form-select-input';
import FormTextInput from '~/components/form-components/form-text-input';
import { Categories } from '~/models/categories';
import { Urgencies } from '~/models/urgency';
import type { ServiceRequestValues } from './edit-request/edit-request.model';
import Form from '~/components/form-components/form';
import CancelRequest from './request-form-cancel';

const RequestForm = ({
	form,
	cancelHandler,
	submitHandler,
	isButtonsInactive,
}: {
	form: UseFormReturn<ServiceRequestValues>;
	cancelHandler: () => void;
	submitHandler: (formData: ServiceRequestValues) => void;
	isButtonsInactive: boolean;
}) => {
	return (
		<Form form={form} submitHandler={submitHandler}>
			<Box className='grid grid-cols-2 gap-4'>
				<FormTextInput
					name={'title'}
					className='col-span-full'
					label='Title'
					variant='outlined'
				/>

				<FormSelectInput
					labelId='label-urgency-id'
					name='urgency'
					label='Urgency'
				>
					{Urgencies.map((u) => (
						<MenuItem key={u.key} value={u.key}>
							{u.value}
						</MenuItem>
					))}
				</FormSelectInput>

				<FormSelectInput
					labelId='label-category-id'
					name='category'
					label='Category'
				>
					{Categories.map((c) => (
						<MenuItem key={c.key} value={c.key}>
							{c.value}
						</MenuItem>
					))}
				</FormSelectInput>

				<FormTextInput
					name='description'
					className='col-span-2'
					label='Description'
					variant='outlined'
					multiline
					maxRows={4}
				/>

				{/* TODO: file upload */}

				<Box className='col-2 flex justify-end gap-2 mt-20'>
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
	);
};

export default RequestForm;
