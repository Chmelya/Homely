import {
	FormControl,
	InputLabel,
	ListItemText,
	MenuItem,
	Select,
	Stack,
	type SelectChangeEvent,
} from '@mui/material';
import { useState } from 'react';
import type { DropdownValue } from '~/models/dropdownValue';

const MenuSelect = ({
	items,
	label,
	id,
	searchParams,
}: {
	items: DropdownValue[];
	id: string;
	label: string;
	searchParams: URLSearchParams;
}) => {
	const initValues = searchParams.getAll(id);
	const selectedNames = items
		.filter((item) => initValues.includes(item.key.toString()))
		.map((item) => item.value);

	const [selectedItems, setSelectedItems] = useState<string[]>(selectedNames);

	const handleChange = (event: SelectChangeEvent<typeof selectedItems>) => {
		const {
			target: { value },
		} = event;

		var newValues = value as string[];

		setSelectedItems(newValues);

		searchParams.delete(id);
		items
			.filter((item) => newValues.includes(item.value))
			.forEach((item) => searchParams.append(id, item.key.toString()));
	};

	return (
		<Stack direction='row' alignItems='center'>
			<FormControl fullWidth>
				<InputLabel id={`${label}-input-label`}>{label}</InputLabel>
				<Select
					labelId={`${label}-multiply-select-label`}
					id={`${label}-multiply-select`}
					size='small'
					fullWidth
					multiple
					value={selectedItems}
					onChange={handleChange}
					renderValue={(selected) => selected.join(', ')}
				>
					{items.map((item) => (
						<MenuItem key={item.key} value={item.value}>
							<ListItemText>{item.value}</ListItemText>
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</Stack>
	);
};

export default MenuSelect;
