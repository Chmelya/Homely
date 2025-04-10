import { useForm } from 'react-hook-form';
import {
	serviceRequestValidationSchema,
	type ServiceRequestValues,
} from '../request-form.model';
import { zodResolver } from '@hookform/resolvers/zod';
import { RequestsService } from '~/api/services/serviceRequests/serviceRequestsServices';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Navigate, useNavigate, useParams } from 'react-router';
import RequestForm from '../request-form';
import type { ServiceRequest } from '~/models/service-request';
import { useRequestQuery } from '../../requests.hooks';
import { useRole } from '~/auth/authorized';
import { Roles } from '~/auth/permissions';
import { useAppSelector } from '~/store/hooks/store-hooks';
import { authSlice } from '~/store/auth/auth-slice';
import { ROUTES } from '~/routes/paths';

const EditRequestPage = () => {
	const { requestId } = useParams<{ requestId: string }>();
	const { data: request, isLoading } = useRequestQuery(requestId!);

	if (isLoading) {
		//TODO: Skeleton
		return <div>LOADER</div>;
	}

	return <RequestFormWrapped request={request!} />;
};

const RequestFormWrapped = ({ request }: { request: ServiceRequest }) => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { hasAccess: isAdmin } = useRole([Roles.Admin]);
	const user = useAppSelector(authSlice.selectors.user);

	if (!isAdmin && request.creatorId !== user?.id) {
		return <Navigate to={ROUTES.forbidden} replace />;
	}

	const { isPending: isPendingUpdate, mutate } = useMutation({
		mutationKey: ['requests', 'edit'],
		mutationFn: isAdmin
			? RequestsService.editRequest
			: RequestsService.editRequestOwner,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['requests'],
			});
			navigate(-1);
		},
	});

	const submitHandler = (formData: ServiceRequestValues) => {
		const newRequest = request;

		newRequest.title = formData.title;
		newRequest.description = formData.description;
		newRequest.categoryId = formData.category;
		newRequest.urgencyId = formData.urgency;
		newRequest.statusId = formData.status;

		mutate(newRequest);
	};

	const cancelHandler = () => {
		navigate(-1);
	};

	const form = useForm<ServiceRequestValues>({
		defaultValues: {
			title: request.title,
			description: request.description,
			category: request.categoryId,
			urgency: request.urgencyId,
			status: request.statusId,
		},
		resolver: zodResolver(serviceRequestValidationSchema),
		mode: 'onTouched',
	});

	return (
		<RequestForm
			form={form}
			cancelHandler={cancelHandler}
			submitHandler={submitHandler}
			isButtonsInactive={isPendingUpdate}
			isEditMode
		/>
	);
};

export default EditRequestPage;
