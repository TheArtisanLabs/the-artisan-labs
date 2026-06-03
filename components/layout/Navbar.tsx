'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useTheme } from '@/lib/theme';

const NAV_LINKS = [
	{ href: '#about', label: '~/About' },
	{ href: '#process', label: '~/Process' },
	{ href: '#services', label: '~/Services' },
	{ href: '#portfolio', label: '~/Portfolio' },
	{ href: '#team', label: '~/Team' },
	{ href: '#stack', label: '~/Stack' },
	{ href: '#faq', label: '~/FAQ' },
	{ href: '#contact', label: '~/Contact' },
];

export default function Navbar() {
	const [scrolled, setScrolled] = useState(false);
	const [open, setOpen] = useState(false);
	const [active, setActive] = useState('');
	const [mounted, setMounted] = useState(false);
	const { theme, toggleTheme } = useTheme();

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 60);
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	useEffect(() => {
		const sections = document.querySelectorAll('section[id]');
		const obs = new IntersectionObserver(
			(entries) => {
				const best = entries.reduce(
					(max, e) =>
						e.intersectionRatio > (max?.intersectionRatio ?? 0)
							? e
							: max,
					null as IntersectionObserverEntry | null
				);
				if (best?.isIntersecting) setActive(best.target.id);
			},
			{ threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] }
		);
		sections.forEach((s) => obs.observe(s));
		return () => obs.disconnect();
	}, []);

	return (
		<nav
			className={cn(
				'fixed top-0 right-0 left-0 z-50 flex h-16 items-center justify-between border-b border-(--border) bg-(--bg) px-6 transition-all duration-300',
				scrolled && 'bg-(--bg)/70 backdrop-blur-md'
			)}
		>
			<a href="#" className="flex items-center">
				<Image
					src="/images/logo/logo-transparent.png"
					alt="Artisan Labs"
					width={526}
					height={526}
					className="h-7 w-auto transition-opacity duration-300 hover:opacity-80 md:h-8"
				/>
				<span className="font-heading ml-2 text-sm font-thin tracking-widest text-(--fg-50) uppercase transition-opacity duration-300 hover:opacity-80">
					Artisan Labs
				</span>
				<span className="ml-0.5 inline-block h-[1.2em] w-2.5 bg-(--accent) align-bottom" />
			</a>

			<ul
				className={cn(
					'flex items-center gap-8 max-lg:fixed max-lg:top-16 max-lg:right-0 max-lg:h-screen max-lg:w-70 max-lg:flex-col max-lg:justify-center max-lg:gap-6 max-lg:border-l max-lg:border-(--border) max-lg:bg-(--bg)/98 max-lg:backdrop-blur-[20px] max-lg:transition-all max-lg:duration-300',
					open ? 'max-lg:right-0' : 'max-lg:-right-full'
				)}
			>
				{NAV_LINKS.map((link) => (
					<li key={link.href}>
						<a
							href={link.href}
							className={cn(
								'text-sm text-(--fg-50) transition-all duration-300 hover:text-(--accent)',
								active === link.href.slice(1) &&
									'text-(--accent) [text-shadow:0_0_12px_var(--accent-30)]'
							)}
							onClick={() => setOpen(false)}
						>
							{link.label}
						</a>
					</li>
				))}
				<li>
					<button
						onClick={toggleTheme}
						className="flex h-10 w-10 items-center justify-center rounded-full border border-(--fg-20) text-(--fg-50) transition-all duration-300 hover:border-(--accent) hover:text-(--accent)"
						aria-label="Toggle theme"
					>
						{mounted ? (
							theme === 'dark' ? (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<circle cx="12" cy="12" r="4" />
									<path d="M12 2v2" />
									<path d="M12 20v2" />
									<path d="m4.93 4.93 1.41 1.41" />
									<path d="m17.66 17.66 1.41 1.41" />
									<path d="M2 12h2" />
									<path d="M20 12h2" />
									<path d="m6.34 17.66-1.41 1.41" />
									<path d="m19.07 4.93-1.41 1.41" />
								</svg>
							) : (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
								</svg>
							)
						) : (
							<div className="h-4 w-4" />
						)}
					</button>
				</li>
			</ul>

			<button
				className="hidden flex-col gap-1.25 border-none bg-transparent p-2 max-lg:flex"
				onClick={() => setOpen((prev) => !prev)}
				aria-label="Menu"
			>
				<span
					className={cn(
						'block h-0.5 w-6 rounded-sm bg-(--fg) transition-all duration-300',
						open && 'translate-y-1.75 rotate-45'
					)}
				/>
				<span
					className={cn(
						'block h-0.5 w-6 rounded-sm bg-(--fg) transition-all duration-300',
						open && 'opacity-0'
					)}
				/>
				<span
					className={cn(
						'block h-0.5 w-6 rounded-sm bg-(--fg) transition-all duration-300',
						open && '-translate-y-1.75 -rotate-45'
					)}
				/>
			</button>
		</nav>
	);
}
