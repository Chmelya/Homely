import { Box, Button, MenuItem, TextField } from '@mui/material';
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
import { defaultUrgency, Urgencies } from '~/models/urgency';
import { useNavigate } from 'react-router';
import { ROUTES } from '~/routes/paths';
import { Categories } from '~/models/categories';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const CreateRequestPage = () => {
	const userId = useAppSelector(authSlice.selectors.user)!.id;
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const form = useForm<ServiceRequestValues>({
		defaultValues: {
			urgency: defaultUrgency,
		},
		resolver: zodResolver(serviceRequestValidationSchema),
		mode: 'onTouched',
	});

	const { isPending, mutate } = useMutation({
		mutationKey: ['requests', 'create'],
		mutationFn: RequestsService.createRequest,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['requests'],
			});
			navigate(ROUTES.requestsMainDefault());
		},
	});

	const submitHandler = async (formData: ServiceRequestValues) => {
		const values = formData as ServiceRequest;
		values.creatorId = userId;

		mutate(values);
	};

	const cancelHandler = () => {
		navigate(-1);
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

				<Box className='col-2 flex justify-end gap-2'>
					<Button
						size='large'
						color='error'
						className='min-w-10'
						variant='outlined'
						fullWidth
						disabled={isPending}
						loading={isPending}
						onClick={cancelHandler}
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
						disabled={isPending}
						loading={isPending}
					>
						Send
					</Button>
				</Box>
			</Box>
		</Form>
	);
};

export default CreateRequestPage;
