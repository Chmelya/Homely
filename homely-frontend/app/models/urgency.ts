import type { DropdownValue } from './dropdownValue';

export enum UrgencyEnum {
	Critical = 1,
	High = 2,
	Medium = 3,
	Low = 4,
	Lowest = 5,
}

export interface Urgency extends DropdownValue {}

//TODO: Remove/Refactor
export const Urgencies = Object.values(UrgencyEnum)
	.filter((v) => typeof v === 'number')
	.map((u) => {
		return {
			key: u,
			value: UrgencyEnum[u],
		} as Urgency;
	});

export const defaultUrgency = UrgencyEnum.Medium;
