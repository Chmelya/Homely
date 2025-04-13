import { TextField } from '@mui/material';
import { Controller, useFormContext, type FieldValues } from 'react-hook-form';

//TODO: determinate  props
export interface FormInputProps extends FieldValues {}

const FormTextInput = (props: FormInputProps) => {
	const { control } = useFormContext();

	return (
		<Controller
			name={props.name}
			control={control}
			render={({
				field: { onChange, value },
				fieldState: { error },
				formState,
			}) => (
				<TextField
					{...props}
					helperText={error ? error.message : null}
					error={!!error}
					onChange={onChange}
					value={value}
				/>
			)}
		/>
	);
};

export default FormTextInput;
