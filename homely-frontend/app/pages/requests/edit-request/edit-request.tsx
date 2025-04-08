import { Box, Button, MenuItem } from '@mui/material';
import { useForm } from 'react-hook-form';
import Form from '~/components/form-components/form';
import {
	serviceRequestValidationSchema,
	type ServiceRequestValues,
} from './edit-request.model';
import { zodResolver } from '@hookform/resolvers/zod';
import FormTextInput from '~/components/form-components/form-text-input';
import { RequestsService } from '~/api/services/serviceRequests/serviceRequestsServices';
import type { ServiceRequest } from '~/models/service-request';
import FormSelectInput from '~/components/form-components/form-select-input';
import { Urgencies } from '~/models/urgency';
import type { Route } from '../../../+types/root';
import { Categories } from '~/models/categories';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { ROUTES } from '~/routes/paths';

export async function clientLoader({ params }: Route.LoaderArgs) {
	const request = await RequestsService.getRequest(Number(params.requestId!));
	return request;
}

const EditRequestPage = ({ loaderData }: Route.ComponentProps) => {
	if (loaderData === undefined) {
		return null;
	}

	const request = loaderData as ServiceRequest;
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const form = useForm<ServiceRequestValues>({
		defaultValues: {
			title: request.title,
			description: request.description,
			category: request.category,
			urgency: request.urgency,
		},
		resolver: zodResolver(serviceRequestValidationSchema),
		mode: 'onTouched',
	});

	const { isPending, mutate } = useMutation({
		mutationKey: ['requests', 'edit'],
		mutationFn: RequestsService.editRequest,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['requests'],
			});
			navigate(-1);
		},
	});

	const submitHandler = (formData: ServiceRequestValues) => {
		request.title = formData.title;
		request.description = formData.description;
		request.category = formData.category;
		request.urgency = formData.urgency;

		mutate(request);
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

export default EditRequestPage;
