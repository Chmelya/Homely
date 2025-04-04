import { Box, Button, MenuItem, Select, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import Form from '~/components/form-components/form';
import {
	serviceRequestValidationSchema,
	type ServiceRequestValues,
} from './create-request.model';
import { zodResolver } from '@hookform/resolvers/zod';
import FormTextInput from '~/components/form-components/form-text-input';
import { RequestsService } from '~/api/services/serviceRequests/serviceRequestsServices';
import type { ServiceRequest } from '~/models/service-request';
import { useAppSelector } from '~/store/hooks/store-hooks';
import { authSlice } from '~/store/auth/auth-slice';
import FormSelectInput from '~/components/form-components/form-select-input';
import { Urgency } from '~/models/urgency';

const CreateRequestPage = () => {
	const userId = useAppSelector(authSlice.selectors.user)!.id;

	const form = useForm<ServiceRequestValues>({
		defaultValues: {
			title: '',
			description: '',
			urgency: Urgency.Medium,
		},
		resolver: zodResolver(serviceRequestValidationSchema),
		mode: 'onTouched',
	});

	const submitHandler = async (formData: ServiceRequestValues) => {
		const values = formData as ServiceRequest;
		values.userId = userId;

		await RequestsService.sendRequest(values);
	};

	return (
		<Form form={form} submitHandler={submitHandler}>
			<Box className='grid grid-cols-2 gap-4'>
				<FormTextInput
					name={'title'}
					className='col-span-full'
					label='Title'
					variant='outlined'
				/>

				<FormSelectInput name='urgency' label='Urgency'>
					{Object.keys(Urgency).map((u) => (
						<MenuItem value={u}>{u}</MenuItem>
					))}
				</FormSelectInput>

				<FormSelectInput name='category' label='Category'>
					<MenuItem value={10}>Ten</MenuItem>
					<MenuItem value={20}>Twenty</MenuItem>
					<MenuItem value={30}>Thirty</MenuItem>
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
						type='submit'
						fullWidth
					>
						Send
					</Button>
				</Box>
			</Box>
		</Form>
	);
};

export default CreateRequestPage;
