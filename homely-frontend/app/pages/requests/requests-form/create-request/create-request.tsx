import { useForm } from 'react-hook-form';
import {
	serviceRequestValidationSchema,
	type ServiceRequestValues,
} from './create-request.model';
import { zodResolver } from '@hookform/resolvers/zod';
import { RequestsService } from '~/api/services/serviceRequests/serviceRequestsServices';
import type { ServiceRequest } from '~/models/service-request';
import { useAppSelector } from '~/store/hooks/store-hooks';
import { authSlice } from '~/store/auth/auth-slice';
import { defaultUrgency } from '~/models/urgency';
import { useNavigate } from 'react-router';
import { ROUTES } from '~/routes/paths';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import RequestForm from '../request-form';

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

	const submitHandler = (formData: ServiceRequestValues) => {
		const values = formData as ServiceRequest;
		values.creatorId = userId;

		mutate(values);
	};

	const cancelHandler = () => {
		navigate(-1);
	};

	return (
		<RequestForm
			form={form}
			cancelHandler={cancelHandler}
			submitHandler={submitHandler}
			isButtonsInactive={isPending}
		/>
	);
};

export default CreateRequestPage;
