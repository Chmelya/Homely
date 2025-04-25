import React, {
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';
import {
	type PaletteMode,
	ThemeProvider as MuiThemeProvider,
	createTheme,
} from '@mui/material';
import { lightTheme, darkTheme } from './themes';

type ThemeContextType = {
	mode: PaletteMode;
	toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
	mode: 'light',
	toggleTheme: () => {},
});

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [mode, setMode] = useState<PaletteMode>('light');

	useEffect(() => {
		const savedMode =
			(localStorage.getItem('themeMode') as PaletteMode) ||
			(window.matchMedia('(prefers-color-scheme: dark)').matches
				? 'dark'
				: 'light');
		setMode(savedMode);
	}, []);

	const toggleTheme = () => {
		const newMode = mode === 'light' ? 'dark' : 'light';
		setMode(newMode);
		localStorage.setItem('themeMode', newMode);
	};

	const theme = useMemo(
		() => createTheme(mode === 'light' ? lightTheme : darkTheme),
		[mode]
	);

	return (
		<ThemeContext.Provider value={{ mode, toggleTheme }}>
			<MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
		</ThemeContext.Provider>
	);
};
