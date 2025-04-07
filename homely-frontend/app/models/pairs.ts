export interface Dictionary<T> {
	[key: string]: T;
}

export const RequestStatuses: Dictionary<string> = {};
RequestStatuses['1'] = 'Created';
RequestStatuses['2'] = 'In progress';
RequestStatuses['3'] = 'Done';
RequestStatuses['4'] = 'Rejected';

export const Urgencies: Dictionary<string> = {};
Urgencies['1'] = 'Critical';
Urgencies['2'] = 'High';
Urgencies['3'] = 'Medium';
Urgencies['4'] = 'Low';
Urgencies['5'] = 'Lowest';

import CriticalIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import HighIcon from '@mui/icons-material/ExpandLess';
import MediumIcon from '@mui/icons-material/Remove';
import LowIcon from '@mui/icons-material/ExpandMore';
import LowestIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import type { ReactNode } from 'react';

export const UrgencyIcons: Dictionary<object> = {};
UrgencyIcons['1'] = CriticalIcon;
UrgencyIcons['2'] = HighIcon;
UrgencyIcons['3'] = MediumIcon;
UrgencyIcons['4'] = LowIcon;
UrgencyIcons['5'] = LowestIcon;
