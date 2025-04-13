import { Navigate, useNavigate, useParams } from 'react-router';
import { usePerformersQuery, useRequestQuery } from '../requests.hooks';
import { Box, Button, Chip, MenuItem, Stack, Typography } from '@mui/material';
import { useRole } from '~/auth/authorized';
import { Roles } from '~/auth/permissions';
import { ROUTES } from '~/routes/paths';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RequestsService } from '~/api/services/serviceRequests/serviceRequestsServices';
import { StatusEnum } from '~/models/statuses';
import Form from '~/components/form-components/form';
import FormSelectInput from '~/components/form-components/form-select-input';
import {
	processServiceRequestValidationSchema,
	type ProcessServiceRequestValues,
} from './request-process.model';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { ServiceRequest } from '~/models/service-request';

const ProcessRequestPage = () => {
	const { hasAccess: isAdmin } = useRole([Roles.Admin]);
	if (!isAdmin) {
		return <Navigate to={ROUTES.forbidden} />;
	}

	const { requestId } = useParams<{ requestId: string }>();
	const { data: request } = useRequestQuery(requestId!);

	if (!request) {
		//TODO: Loader
		return <div>LOAD</div>;
	}

	return <ProcessWrapped request={request} />;
};

const ProcessWrapped = ({ request }: { request: ServiceRequest }) => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const form = useForm<ProcessServiceRequestValues>({
		defaultValues: { performer: undefined },
		resolver: zodResolver(processServiceRequestValidationSchema),
		mode: 'onTouched',
	});

	const { data: performers } = usePerformersQuery(request.categoryId);

	//TODO: To backend self method
	const { isPending: isPendingUpdate, mutate } = useMutation({
		mutationKey: ['requests', 'edit'],
		mutationFn: RequestsService.editRequest,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['requests'],
			});
			navigate(-1);
		},
	});

	if (!performers) {
		//TODO: Loader
		return <div>LOAD</div>;
	}

	// TODO: Refactor to new api method
	const onRejectHandler = () => {
		const newRequest = request;
		newRequest.statusId = StatusEnum.Rejected;
		mutate(newRequest);
	};

	const onCompleteHandler = () => {
		const newRequest = request;
		newRequest.statusId = StatusEnum.Done;

		mutate(newRequest);
	};

	const onSubmitHandler = (values: ProcessServiceRequestValues) => {
		const newRequest = request;

		newRequest.statusId = StatusEnum.InProgress;
		newRequest.performerId = values.performer;

		mutate(newRequest);
	};

	return (
		<>
			<Typography className='flex justify-center' variant='h4'>
				{request.title}
			</Typography>
			<Stack direction='column' className='mt-10' gap={4}>
				<Stack direction='row' gap={10} justifyContent='space-between'>
					<Typography variant='h6'>
						Status:{' '}
						<Chip label={request.statusName} color='default' size='medium' />
					</Typography>
					<Button
						variant='contained'
						className='max-w-40'
						fullWidth
						onClick={() => navigate(ROUTES.editRequest(request.requestId))}
					>
						Edit request
					</Button>
				</Stack>
				<Stack direction='row' gap={2}>
					<Typography variant='h6'>Category: {request.categoryName}</Typography>
					<Typography variant='h6'>Urgency: {request.urgencyName}</Typography>
				</Stack>
				{request.description && (
					<Stack direction='row'>
						<Typography variant='body1'>
							Description: {request.description}
						</Typography>
					</Stack>
				)}
				{request.statusId === StatusEnum.Created && (
					<Stack direction='column' className='w-full'>
						<Form form={form} submitHandler={onSubmitHandler}>
							<>
								<Stack>
									<FormSelectInput
										labelId='performers-id'
										name='performer'
										label='Performers'
										fullWidth
									>
										{performers.map((p) => (
											<MenuItem key={p.key} value={p.key}>
												{p.value}
											</MenuItem>
										))}
									</FormSelectInput>
								</Stack>
								<Stack
									className='mt-12'
									direction='row'
									justifyContent='end'
									justifyItems='center'
									gap={2}
								>
									<Button
										variant='contained'
										color='error'
										className='max-w-40'
										fullWidth
										onClick={onRejectHandler}
										disabled={isPendingUpdate}
										loading={isPendingUpdate}
									>
										Reject
									</Button>
									{request.statusId === StatusEnum.Created && (
										<Button
											variant='contained'
											color='success'
											className='max-w-40'
											fullWidth
											type='submit'
											disabled={isPendingUpdate}
											loading={isPendingUpdate}
										>
											Start work
										</Button>
									)}
								</Stack>
							</>
						</Form>
					</Stack>
				)}
			</Stack>
			{request.statusId === StatusEnum.InProgress && (
				<Stack
					className='mt-12'
					direction='row'
					justifyContent='end'
					justifyItems='center'
					gap={2}
				>
					<Button
						variant='contained'
						color='error'
						className='max-w-40'
						fullWidth
						onClick={onRejectHandler}
						disabled={isPendingUpdate}
						loading={isPendingUpdate}
					>
						Reject
					</Button>
					<Button
						variant='contained'
						color='success'
						className='max-w-40'
						fullWidth
						onClick={onCompleteHandler}
						disabled={isPendingUpdate}
						loading={isPendingUpdate}
						type='submit'
					>
						Complete
					</Button>
				</Stack>
			)}
		</>
	);
};

export default ProcessRequestPage;
