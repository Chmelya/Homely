import { useForm } from 'react-hook-form';
import {
	serviceRequestValidationSchema,
	type ServiceRequestValues,
} from './edit-request.model';
import { zodResolver } from '@hookform/resolvers/zod';
import { RequestsService } from '~/api/services/serviceRequests/serviceRequestsServices';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router';
import RequestForm from '../request-form';
import type { ServiceRequest } from '~/models/service-request';

const EditRequestPage = () => {
	const { requestId } = useParams<{ requestId: string }>();

	const { data: request, isLoading } = useQuery({
		queryKey: ['request', Number(requestId)],
		queryFn: () => RequestsService.getRequest(Number(requestId)),
	});

	if (isLoading) {
		//TODO: Skeleton
		return <div>LOADER</div>;
	}

	return <RequestFormWrapped request={request!} />;
};

const RequestFormWrapped = ({ request }: { request: ServiceRequest }) => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

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
