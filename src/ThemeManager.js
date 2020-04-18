import React, { useEffect } from 'react';

const defaultMode = 'dark';

export const ManageThemeContext = React.createContext({
	mode: defaultMode,
	toggle: () => console.log('theme')
});

export const useTheme = () => React.useContext(ManageThemeContext);

export const ThemeManager = ({ children }) => {
	const [themeState, setThemeState] = React.useState({
		mode: localStorage.getItem('theme')
	});

	useEffect(() => {
		localStorage.setItem('theme', themeState.mode);
	}, [themeState]);

	const toggle = () => {
		setThemeState({ mode: themeState.mode === 'light' ? `dark` : `light` });
	};
	return (
		<ManageThemeContext.Provider
			value={{
				mode: themeState.mode,
				toggle: toggle
			}}>
			{children}
		</ManageThemeContext.Provider>
	);
};
