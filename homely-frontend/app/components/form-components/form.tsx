import { Box } from '@mui/material';
import {
	FormProvider,
	type FieldValues,
	type SubmitHandler,
	type UseFormReturn,
} from 'react-hook-form';

export interface FormProps<T extends FieldValues> {
	form: UseFormReturn<T>;
	submitHandler: SubmitHandler<T>;
	children: React.JSX.Element;
	className?: string;
}

const Form = <T extends FieldValues>({
	form,
	children,
	submitHandler,
	className,
}: FormProps<T>) => {
	return (
		<FormProvider {...form}>
			<form onSubmit={form.handleSubmit(submitHandler)}>{children}</form>
		</FormProvider>
	);
};

export default Form;
