'use client';

import { useEffect, useState, useCallback } from 'react';

const PHRASES = [
	'crafting web experiences',
	'shipping mobile products',
	'designing with intent',
	'building custom software',
];

function useTypewriter(phrases: string[]) {
	const [text, setText] = useState('');
	const [pi, setPi] = useState(0);
	const [ci, setCi] = useState(0);
	const [del, setDel] = useState(false);

	const tick = useCallback(() => {
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

const WORDS_LINE1 = [
	{ text: 'We', i: 0 },
	{ text: "don't", i: 1 },
	{ text: 'just', i: 2 },
	{ text: 'write', i: 3 },
	{ text: 'code.', i: 4 },
];

const WORDS_LINE2 = [
	{ text: 'We', i: 5 },
	{ text: 'build', i: 6 },
	{ text: 'things', i: 7 },
	{ text: 'that', i: 8 },
	{ text: 'last.', i: 9 },
];

export default function Hero() {
	const text = useTypewriter(PHRASES);

	return (
		<section
			id="hero"
			className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-(--bg) px-6 pt-30 pb-20 text-center"
		>
			<div
				className="pointer-events-none absolute inset-0"
				style={{
					backgroundImage:
						'radial-gradient(circle, rgba(238,241,239,0.06) 1px, transparent 1px)',
					backgroundSize: '40px 40px',
					animation: 'dotDrift 12s ease-in-out infinite',
				}}
			/>

			<div
				className="pointer-events-none absolute top-1/2 left-1/2 h-[70vmax] w-[70vmax] -translate-x-1/2 -translate-y-1/2 rounded-full"
				style={{
					background:
						'radial-gradient(circle at center, rgba(64,98,187,0.12) 0%, transparent 60%)',
				}}
			/>

			<div className="relative z-10 mx-auto max-w-225">
				<h1 className="mb-2 text-[clamp(36px,8vw,96px)] leading-[1.15] font-bold tracking-tighter text-(--fg)">
					{WORDS_LINE1.map((w) => (
						<span
							key={w.i}
							className="inline-block animate-[wordUp_0.8s_cubic-bezier(0.16,1,0.3,1)_forwards]"
							style={{
								opacity: 0,
								transform: 'translateY(50px)',
								animationDelay: `${w.i * 0.1}s`,
							}}
						>
							{w.text}{' '}
						</span>
					))}
				</h1>
				<h1 className="mb-2 text-[clamp(36px,8vw,96px)] leading-[1.15] font-bold tracking-tighter text-(--fg)">
					{WORDS_LINE2.map((w) => (
						<span
							key={w.i}
							className="inline-block animate-[wordUp_0.8s_cubic-bezier(0.16,1,0.3,1)_forwards]"
							style={{
								opacity: 0,
								transform: 'translateY(50px)',
								animationDelay: `${w.i * 0.1}s`,
							}}
						>
							{w.text}{' '}
						</span>
					))}
				</h1>

				<p className="mt-8 min-h-[1.8em] text-[clamp(14px,2vw,20px)] text-(--fg-80)">
					<span className="text-(--accent)">{'// '}</span>
					{text}
					<span className="inline-block w-2 animate-[blink_0.8s_step-end_infinite] font-bold text-(--accent)">
						|
					</span>
				</p>
			</div>

			<div className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2">
				<div className="h-9 w-px animate-[scrollPulse_2.2s_ease-in-out_infinite] bg-linear-to-b from-(--accent) to-transparent" />
				<span className="text-[10px] tracking-[3px] text-(--accent) uppercase opacity-50">
					scroll
				</span>
			</div>
		</section>
	);
}
