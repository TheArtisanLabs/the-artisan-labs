import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/lib/theme';
import { ConvexClientProvider } from '@/components/Providers/ConvexClientProvider';
import CustomCursor from '@/components/ui/CustomCursor';
import Navbar from '@/components/layout/Navbar';

const jetbrainsMono = JetBrains_Mono({
	variable: '--font-jetbrains-mono',
	subsets: ['latin'],
	weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
	title: 'Artisan Labs',
	description:
		"We don't just write code. We build things that last. — Artisan Labs",
	icons: '/images/logo/logo-transparent.png',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={`${jetbrainsMono.variable} dark`}
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
			</body>
		</html>
	);
}
