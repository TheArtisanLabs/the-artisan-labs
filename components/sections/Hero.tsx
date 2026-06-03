'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';

const CODE_STRINGS = [
	'// artisan-labs',
	'~/build/studio',
	'import { craft } from "@artisan/core"',
	'const vision = "build things that last"',
	'export function create() {',
	'/* micro-interactions */',
	'npm run build',
	'deploy --production',
	'// pixel-perfect',
	'React.createApp()',
	'type Studio = { craft: () => void }',
	'git commit -m "ship it"',
	'// edge cases matter',
	'<Artisan.Labs />',
	'console.log("built with intent")',
	':root { --craft: #4062BB }',
	'├── src/',
	'│   ├── components/',
	'./run.sh --watch',
	'[OK] build successful',
	'ls -la projects/',
	'cat README.md',
	'craft build deploy',
	'while(true) { create() }',
	'// since 2024',
	'function iterate(idea)',
	'systemctl start artisan',
	'127.0.0.1:3000',
	'localhost:craft',
	'// designed with intent',
	'test --all',
	'export default vision',
	'interface Craft {',
	'#pragma once',
	'from artisan import craft',
	'// thoughtful by default',
	'docker compose up',
	'pnpm run dev',
	'"build": "craft --dev"',
	'npx artisan init',
	'@media (craft) { quality: 100% }',
	'// shipping confidence',
	'bin/dev watch',
	'quality > quantity',
	'const { craft } = await import',
	'// details. every single one.',
	'artisan-labs@studio:~$',
	'cat about.md',
	'pwd',
	'whoami',
	'ls -la',
	'mkdir -p ~/projects/last',
	'git init',
	'npm create artisan',
	'craft --watch src/',
	'// zero shortcuts',
	'pull request reviewed',
	'test --coverage 100',
	'deploy --prod --rollback',
];

const BRIGHT_KEYWORDS = [
	'// artisan-labs',
	'craft',
	'build',
	'export',
	'const vision',
	'npm run build',
	'[OK] build successful',
	'deploy --prod',
	'cat README.md',
	'// designed with intent',
	'// shipping confidence',
	'// details. every single one.',
	'quality > quantity',
	'test --coverage 100',
	'deploy --prod --rollback',
	'artisan-labs@studio:~$',
	'npm create artisan',
];

function useTypewriter(phrases: string[]) {
	const [text, setText] = useState('');
	const [pi, setPi] = useState(0);
	const [ci, setCi] = useState(0);
	const [del, setDel] = useState(false);

	const tick = useCallback(() => {
		if (phrases.length === 0) return;
		const p = phrases[pi];
		if (del) {
			if (ci === 0) {
				setDel(false);
				setPi((prev) => (prev + 1) % phrases.length);
				return;
			}
			setCi((c) => c - 1);
			setText(p.substring(0, ci - 1));
		} else {
			if (ci === p.length) {
				setTimeout(() => setDel(true), 2000);
				return;
			}
			setCi((c) => c + 1);
			setText(p.substring(0, ci + 1));
		}
	}, [ci, del, pi, phrases]);

	useEffect(() => {
		const timeout = setTimeout(tick, del ? 30 : 60);
		return () => clearTimeout(timeout);
	}, [tick, del]);

	return text;
}

type Word = { t: string; d: number; id: string; accent?: true; glow?: true };

const LINES: Word[][] = [
	[
		{ t: 'We', d: 0, id: 'w0' },
		{ t: "don't", d: 0.07, id: 'w1' },
		{ t: 'just', d: 0.14, id: 'w2' },
	],
	[
		{ t: 'write', d: 0.21, id: 'w3' },
		{ t: 'code.', d: 0.28, id: 'w4' },
	],
	[
		{ t: 'We', d: 0.35, id: 'w5' },
		{ t: 'build', d: 0.42, id: 'w6', accent: true, glow: true },
	],
	[
		{ t: 'things', d: 0.49, id: 'w7' },
		{ t: 'that', d: 0.56, id: 'w8' },
		{ t: 'last.', d: 0.63, id: 'w9', accent: true },
	],
];

export default function Hero() {
	const constRef = useRef<HTMLDivElement>(null);
	const pos = useRef({ x: 0, y: 0 });
	const target = useRef({ x: 0, y: 0 });
	const frame = useRef({ w: 0, h: 0 });
	const phrases = useQuery(api.phrases.getAll);
	const seedPhrases = useMutation(api.phrases.seed);
	const text = useTypewriter(phrases?.map((p) => p.text) ?? []);

	useEffect(() => {
		if (phrases?.length === 0) {
			seedPhrases();
		}
	}, [phrases, seedPhrases]);

	useEffect(() => {
		const container = constRef.current;
		if (!container) return;

		frame.current.w = window.innerWidth;
		frame.current.h = window.innerHeight;
		target.current.x = frame.current.w / 2;
		target.current.y = frame.current.h / 2;
		pos.current.x = frame.current.w / 2;
		pos.current.y = frame.current.h / 2;

		const els: HTMLDivElement[] = [];
		const placed: { x: number; y: number; w: number; h: number }[] = [];
		const isSmall = frame.current.w < 600;
		const isMedium = frame.current.w < 1024;
		const count = isSmall ? 30 : isMedium ? 45 : 58;
		const vw = frame.current.w;
		const vh = frame.current.h;

		for (let i = 0; i < count && i < CODE_STRINGS.length; i++) {
			const el = document.createElement('div');
			el.className = 'constellation-el';
			el.textContent = CODE_STRINGS[i];

			let size = 7 + Math.random() * 42;
			const isLarge = size > 28;
			const isMediumSize = size > 18 && size <= 28;
			const isVeryLarge = size > 36;

			// Estimate element dimensions in px
			const estW = CODE_STRINGS[i].length * size * 0.55;
			const estH = size * 1.3;
			const padding = 10;
			const margin = 20;
			let bestX = 3 + Math.random() * 94;
			let bestY = 3 + Math.random() * 94;
			let foundSpot = false;

			for (let attempt = 0; attempt < 25; attempt++) {
				const tryX = 3 + Math.random() * 94;
				const tryY = 3 + Math.random() * 94;
				const tryPxX = (tryX / 100) * vw;
				const tryPxY = (tryY / 100) * vh;

				let collides = false;
				for (const p of placed) {
					if (
						tryPxX < p.x + p.w + margin &&
						tryPxX + estW + margin > p.x &&
						tryPxY < p.y + p.h + margin &&
						tryPxY + estH + margin > p.y
					) {
						collides = true;
						break;
					}
				}

				if (!collides) {
					bestX = tryX;
					bestY = tryY;
					foundSpot = true;
					break;
				}
			}

			if (!foundSpot && size > 18) {
				size = 10 + Math.random() * 8;
			}

			if (!foundSpot) {
				bestX = 3 + Math.random() * 94;
				bestY = 3 + Math.random() * 94;
			}

			const effW = CODE_STRINGS[i].length * size * 0.55;
			const effH = size * 1.3;
			placed.push({
				x: (bestX / 100) * vw - padding,
				y: (bestY / 100) * vh - padding,
				w: effW + padding * 2,
				h: effH + padding * 2,
			});

			const depth = 1 + Math.floor(Math.random() * 8);
			const isLargeNow = size > 28;
			const isMediumNow = size > 18 && size <= 28;
			const isVeryLargeNow = size > 36;
			const op = isVeryLargeNow
				? 0.08 + Math.random() * 0.06
				: isLargeNow
					? 0.05 + Math.random() * 0.04
					: isMediumNow
						? 0.03 + Math.random() * 0.03
						: 0.015 + Math.random() * 0.02;

			el.style.cssText = [
				`left:${bestX}%;`,
				`top:${bestY}%;`,
				`font-size:${size}px;`,
				`opacity:${op};`,
			].join('');
			if (isVeryLargeNow || isLargeNow) el.style.fontWeight = '700';
			(el as any)._depth = depth;
			container.appendChild(el);
			els.push(el);
		}

		setTimeout(() => {
			els.forEach((el) => {
				const txt = el.textContent || '';
				if (BRIGHT_KEYWORDS.some((k) => txt.includes(k))) {
					setTimeout(() => {
						el.classList.add('bright');
						setTimeout(() => el.classList.remove('bright'), 2800);
					}, Math.random() * 2000);
				}
			});
		}, 1100);

		const onMouse = (e: MouseEvent) => {
			target.current.x = e.clientX;
			target.current.y = e.clientY;
		};
		const onTouch = (e: TouchEvent) => {
			const t = e.touches[0];
			target.current.x = t.clientX;
			target.current.y = t.clientY;
		};
		document.addEventListener('mousemove', onMouse);
		document.addEventListener('touchmove', onTouch, { passive: true });

		const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

		let raf: number;
		const animate = () => {
			pos.current.x = lerp(pos.current.x, target.current.x, 0.06);
			pos.current.y = lerp(pos.current.y, target.current.y, 0.06);
			const dx = (pos.current.x - frame.current.w / 2) / frame.current.w;
			const dy = (pos.current.y - frame.current.h / 2) / frame.current.h;
			for (let i = 0; i < els.length; i++) {
				const d = (els[i] as any)._depth;
				els[i].style.transform =
					`translate(${dx * d * 14}px,${dy * d * 14}px)`;
			}
			raf = requestAnimationFrame(animate);
		};
		raf = requestAnimationFrame(animate);

		const onResize = () => {
			frame.current.w = window.innerWidth;
			frame.current.h = window.innerHeight;
			target.current.x = frame.current.w / 2;
			target.current.y = frame.current.h / 2;
			pos.current.x = frame.current.w / 2;
			pos.current.y = frame.current.h / 2;
		};
		window.addEventListener('resize', onResize);

		return () => {
			document.removeEventListener('mousemove', onMouse);
			document.removeEventListener('touchmove', onTouch);
			window.removeEventListener('resize', onResize);
			cancelAnimationFrame(raf);
			els.forEach((el) => el.remove());
		};
	}, []);

	return (
		<section
			id="hero"
			className="relative flex min-h-screen flex-col overflow-hidden bg-(--bg) pt-24 pb-30"
		>
			<div
				className="pointer-events-none absolute inset-0"
				style={{
					backgroundImage:
						'radial-gradient(circle, rgba(238,241,239,0.04) 1px, transparent 1px)',
					backgroundSize: '32px 32px',
				}}
			/>

			<div
				ref={constRef}
				className="constellation pointer-events-none absolute inset-0 overflow-hidden"
			/>

			<div
				className="pointer-events-none absolute inset-0 z-1"
				style={{
					background:
						'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(238,241,239,0.008) 2px, rgba(238,241,239,0.008) 3px)',
				}}
			/>

			<div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center lg:hidden">
				<div
					className="h-[80vmin] w-[80vmin] rounded-full"
					style={{
						background:
							'radial-gradient(circle at center, rgba(64,98,187,0.12) 0%, rgba(64,98,187,0.04) 40%, transparent 65%)',
						animation: 'glowPulse 6s ease-in-out infinite',
					}}
				/>
				<Image
					src="/images/logo/logo-transparent.png"
					alt=""
					aria-hidden="true"
					width={526}
					height={526}
					priority
					className="absolute h-[65vmin] w-[65vmin] opacity-20"
					style={{ animation: 'glowPulse 8s ease-in-out infinite' }}
				/>
			</div>

			<div className="relative z-2 mx-auto flex w-full max-w-7xl flex-1 items-center px-6">
				<div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1fr]">
					<div className="text-center lg:text-left">
						<p
							className="mb-5 text-[13px] tracking-[3px] text-(--accent) uppercase"
							style={{
								animation:
									'fadeSlideUp 0.6s ease 0.1s forwards',
							}}
						>
							{'// artisan labs'}
						</p>

						<h1 className="text-[clamp(36px,6vw,72px)] leading-[1.15] font-bold tracking-tight text-(--fg)">
							{LINES.map((line, li) => (
								<div key={li} className="whitespace-nowrap">
									{line.flatMap((w, wi) => [
										<span
											key={w.id}
											className="inline-block"
											style={{
												animation: `wordRise 0.7s cubic-bezier(0.16,1,0.3,1) ${w.d}s forwards`,
												color: w.accent
													? 'var(--accent)'
													: undefined,
												textShadow: w.glow
													? '0 0 60px var(--accent-30), 0 0 120px var(--accent-20)'
													: undefined,
											}}
										>
											{w.t}
										</span>,
										wi < line.length - 1 ? ' ' : '',
									])}
								</div>
							))}
						</h1>

						<p
							className="mt-6 min-h-[1.8em] max-w-150 text-[clamp(14px,1.2vw,17px)] leading-relaxed text-(--fg-80)"
							style={{
								animation:
									'fadeSlideUp 0.6s ease 0.5s forwards',
							}}
						>
							<span className="text-(--accent)">{'// '}</span>
							{text}
							<span className="inline-block w-2 animate-[blink_0.8s_step-end_infinite] font-normal text-(--accent)">
								|
							</span>
						</p>

						<div
							className="mt-10 flex flex-wrap justify-center gap-4 lg:justify-start"
							style={{
								animation:
									'fadeSlideUp 0.6s ease 0.8s forwards',
							}}
						>
							<a
								href="mailto:hello@artisanlabs.dev"
								className="inline-flex items-center gap-2 rounded-md border border-(--accent) bg-(--accent) px-7 py-3.5 font-mono text-[14px] font-medium text-(--fg) no-underline transition-all duration-300 hover:-translate-y-0.5 hover:bg-(--accent)/85 hover:shadow-[0_0_24px_var(--accent-20)]"
							>
								&gt; start a project
							</a>
							<a
								href="#portfolio"
								className="inline-flex items-center gap-2 rounded-md border border-(--accent-30) bg-transparent px-7 py-3.5 font-mono text-[14px] font-medium text-(--fg-80) no-underline transition-all duration-300 hover:-translate-y-0.5 hover:border-(--accent) hover:text-(--fg) hover:shadow-[0_0_20px_var(--accent-10)]"
							>
								view our work &rarr;
							</a>
						</div>
					</div>

					<div className="relative hidden items-center justify-center lg:flex">
						<div
							className="h-[70vmin] w-[70vmin] rounded-full"
							style={{
								background:
									'radial-gradient(circle at center, rgba(64,98,187,0.12) 0%, rgba(64,98,187,0.04) 40%, transparent 65%)',
								animation: 'glowPulse 6s ease-in-out infinite',
							}}
						/>
						<Image
							src="/images/logo/logo-transparent.png"
							alt=""
							aria-hidden="true"
							width={526}
							height={526}
							priority
							className="absolute inset-0 m-auto h-[55vmin] w-[55vmin] opacity-20"
							style={{
								animation: 'glowPulse 8s ease-in-out infinite',
							}}
						/>
					</div>
				</div>
			</div>

			<div
				className="absolute bottom-9 left-1/2 z-2 flex -translate-x-1/2 flex-col items-center gap-1.5"
				style={{
					animation: 'fadeSlideUp 0.6s ease 1.2s forwards',
				}}
			>
				<span
					className="text-[22px] font-bold text-(--accent)"
					style={{ animation: 'promptBlink 1.2s step-end infinite' }}
				>
					_
				</span>
				<span className="text-[9px] tracking-[4px] text-(--accent) uppercase opacity-40">
					Scroll
				</span>
			</div>
		</section>
	);
}
