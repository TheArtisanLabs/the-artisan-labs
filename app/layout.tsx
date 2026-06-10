import type { Metadata } from 'next';
import { Monda } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/lib/theme';
import { ConvexClientProvider } from '@/components/Providers/ConvexClientProvider';
import CustomCursor from '@/components/ui/CustomCursor';
import Navbar from '@/components/layout/Navbar';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { FC, PropsWithChildren } from 'react';

const monda = Monda({
	variable: '--font-monda',
	subsets: ['latin'],
	weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
	title: 'Artisan Labs',
	description:
		"We don't just write code. We build things that last. — Artisan Labs",
	icons: '/images/logo/logo-transparent.png',
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<html
			lang="en"
			className={`${monda.variable} dark`}
			suppressHydrationWarning
		>
			<body className="min-h-full antialiased">
				<ConvexClientProvider>
					<ThemeProvider>
						<CustomCursor />
						<Navbar />
						<main className="flex flex-1 flex-col">{children}</main>
					</ThemeProvider>
				</ConvexClientProvider>
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	);
};

export default RootLayout;
