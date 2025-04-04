import { FormControl, InputLabel, Select } from '@mui/material';
import { Controller, useFormContext, type FieldValues } from 'react-hook-form';

//TODO: why work?
export interface FormInputProps extends FieldValues {}

const FormSelectInput = (props: FormInputProps) => {
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
				<FormControl>
					<InputLabel id={props.labelId}>{props.label}</InputLabel>
					<Select {...props} error={!!error} onChange={onChange} value={value}>
						{props.children}
					</Select>
				</FormControl>
			)}
		/>
	);
};

export default FormSelectInput;
