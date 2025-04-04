import type { DropdownValue } from './dropdownValue';

//TODO: Get from api
export enum CategoryEnum {
	Other = 1,
}

export interface Category extends DropdownValue {}

export const Categories = Object.values(CategoryEnum)
	.filter((v) => typeof v === 'number')
	.map((u) => {
		return {
			key: u,
			value: CategoryEnum[u],
		} as Category;
	});
