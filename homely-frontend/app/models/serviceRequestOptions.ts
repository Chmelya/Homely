import type { DropdownValue } from './dropdownValue';

export interface ServiceRequestOptions {
	categories: DropdownValue[];
	urgencies: DropdownValue[];
	statuses: DropdownValue[];
}
