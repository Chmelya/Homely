import { Navigate, useNavigate, useParams } from 'react-router';
import { useRequestQuery } from '../requests.hooks';
import { Button, Chip, Stack, Typography } from '@mui/material';
import { useRole } from '~/auth/authorized';
import { Roles } from '~/auth/permissions';
import { ROUTES } from '~/routes/paths';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RequestsService } from '~/api/services/serviceRequests/serviceRequestsServices';
import { StatusEnum } from '~/models/statuses';

const ProcessRequestPage = () => {
	const { hasAccess: isAdmin } = useRole([Roles.Admin]);
	if (!isAdmin) {
		return <Navigate to={ROUTES.forbidden} />;
	}

	const { requestId } = useParams<{ requestId: string }>();
	const { data: request } = useRequestQuery(requestId!);
	const queryClient = useQueryClient();
	const navigate = useNavigate();

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

	if (!request) {
		//TODO: Loader
		return <div>LOAD</div>;
	}

	const onRejectHandler = () => {
		const newRequest = request;
		newRequest.statusId = StatusEnum.Rejected;
		mutate(request);
	};

	const onStartHandler = () => {
		const newRequest = request;
		newRequest.statusId = StatusEnum.InProgress;
		mutate(request);
	};

	const onCompleteHandler = () => {
		const newRequest = request;
		newRequest.statusId = StatusEnum.Done;
		mutate(request);
	};
	return (
		<>
			<Typography className='flex justify-center' variant='h4'>
				{request.title}
			</Typography>
			<Stack direction='column' className='mt-10'>
				<Stack direction='row' gap={10}>
					<Typography variant='h6'>
						Status:{' '}
						<Chip label={request.statusName} color='default' size='medium' />
					</Typography>
					<Typography variant='h6'>Category: {request.categoryName}</Typography>
					<Typography variant='h6'>Urgency: {request.urgencyName}</Typography>
				</Stack>
				{request.description && (
					<Stack direction='row'>
						<Typography variant='h5'>{request.description}</Typography>
					</Stack>
				)}
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
				{request.statusId === 1 && (
					<Button
						variant='contained'
						color='success'
						className='max-w-40'
						fullWidth
						onClick={onStartHandler}
						disabled={isPendingUpdate}
						loading={isPendingUpdate}
					>
						Start work
					</Button>
				)}{' '}
				{request.statusId === 2 && (
					<Button
						variant='contained'
						color='success'
						className='max-w-40'
						fullWidth
						onClick={onCompleteHandler}
						disabled={isPendingUpdate}
						loading={isPendingUpdate}
					>
						Complete
					</Button>
				)}
			</Stack>
		</>
	);
};

export default ProcessRequestPage;
