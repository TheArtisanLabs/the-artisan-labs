'use client';

import {
	createContext,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from 'react';

type Theme = 'light' | 'dark';

type ThemeContextType = {
	theme: Theme;
	toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

function getInitialTheme(): Theme {
	if (typeof window === 'undefined') return 'dark';
	const stored = localStorage.getItem('theme') as Theme | null;
	if (stored) return stored;
	return window.matchMedia('(prefers-color-scheme: dark)').matches
		? 'dark'
		: 'light';
}

export function ThemeProvider({ children }: { children: ReactNode }) {
	const [theme, setTheme] = useState<Theme>(getInitialTheme);

	useEffect(() => {
		const root = document.documentElement;
		root.classList.remove('light', 'dark');
		root.classList.add(theme);
		localStorage.setItem('theme', theme);
	}, [theme]);

	const toggleTheme = () =>
		setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}

export function useTheme() {
	const ctx = useContext(ThemeContext);
	if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
	return ctx;
}
