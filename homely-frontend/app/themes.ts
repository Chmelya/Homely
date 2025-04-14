import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
	palette: {
		// ===== Core Colors =====
		primary: {
			main: '#E91E63',
			light: '#F06292',
			dark: '#C2185B',
			contrastText: '#FFF',
			50: '#FCE4EC',
			100: '#F8BBD0',
			200: '#F48FB1',
			300: '#F06292',
			400: '#EC407A',
			500: '#E91E63',
			600: '#D81B60',
			700: '#C2185B',
			800: '#AD1457',
			900: '#880E4F',
		},

		secondary: {
			main: '#9C27B0',
			light: '#BA68C8',
			dark: '#7B1FA2',
			contrastText: '#FFF',
			50: '#F3E5F5',
			100: '#E1BEE7',
			200: '#CE93D8',
			300: '#BA68C8',
			400: '#AB47BC',
			500: '#9C27B0',
			600: '#8E24AA',
			700: '#7B1FA2',
			800: '#6A1B9A',
			900: '#4A148C',
		},

		// ===== Background & Surfaces =====
		background: {
			default: '#FFF8F0',
			paper: '#FFFDFA',
		},

		// ===== Text =====
		text: {
			primary: '#2A2A2A',
			secondary: '#5D5D5D',
			disabled: '#B0B0B0',
		},

		// ===== States & Actions =====
		error: {
			main: '#D32F2F',
			light: '#EF5350',
			dark: '#C62828',
		},
		warning: {
			main: '#ED6C02',
			light: '#FF9800',
			dark: '#E65100',
		},
		info: {
			main: '#0288D1',
			light: '#03A9F4',
			dark: '#01579B',
		},
		success: {
			main: '#2E7D32',
			light: '#4CAF50',
			dark: '#1B5E20',
		},

		// ===== Additional Settings =====
		divider: 'rgba(0, 0, 0, 0.12)',
		action: {
			active: 'rgba(0, 0, 0, 0.54)',
			hover: 'rgba(233, 30, 99, 0.08)',
			selected: 'rgba(233, 30, 99, 0.16)',
			disabled: 'rgba(0, 0, 0, 0.26)',
			disabledBackground: 'rgba(0, 0, 0, 0.12)',
		},
	},

	// ===== Typography =====
	typography: {
		fontFamily: '"Roboto", "Helvetica", sans-serif',
		h1: { color: '#2A2A2A' },
		button: { textTransform: 'none' },
	},
});

export const darkTheme = createTheme({
	palette: {
		// ===== Core Colors (Dark Mode) =====
		primary: {
			main: '#FF80AB',
			light: '#FFB2DD',
			dark: '#F50057',
			contrastText: '#121212',
			50: '#2A0A14',
			100: '#4A1428',
			200: '#6A1B3C',
			300: '#8E244F',
			400: '#B8376B',
			500: '#E91E63',
			600: '#FF4081',
			700: '#FF79B0',
			800: '#FFA6C9',
			900: '#FFD6E7',
		},

		secondary: {
			main: '#BA68C8',
			light: '#E1BEE7',
			dark: '#9C27B0',
			contrastText: '#121212',
		},

		// ===== Dark Background & Surfaces =====
		background: {
			default: '#1A1A1A',
			paper: '#242424',
		},

		// ===== Text (Light-on-Dark) =====
		text: {
			primary: '#F5F5F5',
			secondary: '#BDBDBD',
			disabled: '#616161',
		},

		// ===== States & Actions =====
		error: {
			main: '#EF5350',
			light: '#FF867C',
			dark: '#C62828',
		},
		warning: {
			main: '#FFA726',
			light: '#FFD95B',
			dark: '#F57C00',
		},
		info: {
			main: '#4FC3F7',
			light: '#8BF6FF',
			dark: '#0288D1',
		},
		success: {
			main: '#81C784',
			light: '#B2FF59',
			dark: '#388E3C',
		},

		// ===== Dark Mode Essentials =====
		divider: 'rgba(255, 255, 255, 0.12)',
		action: {
			active: '#FFFFFF',
			hover: 'rgba(255, 128, 171, 0.08)',
			selected: 'rgba(255, 128, 171, 0.16)',
			disabled: 'rgba(255, 255, 255, 0.3)',
			disabledBackground: 'rgba(255, 255, 255, 0.12)',
		},
		mode: 'dark',
		tonalOffset: 0.3,
	},

	// ===== Typography Adjustments =====
	typography: {
		fontFamily: '"Roboto", "Helvetica", sans-serif',
		h1: { color: '#F5F5F5' },
		button: {
			textTransform: 'none',
			color: '#FF80AB',
		},
	},
});
