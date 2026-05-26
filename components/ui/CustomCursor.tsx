'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
	const cursorRef = useRef<HTMLDivElement>(null);
	const pos = useRef({ x: 0, y: 0 });
	const target = useRef({ x: 0, y: 0 });

	useEffect(() => {
		const onMouse = (e: MouseEvent) => {
			target.current.x = e.clientX;
			target.current.y = e.clientY;
		};
		document.addEventListener('mousemove', onMouse);

		let raf: number;
		const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

		const tick = () => {
			pos.current.x = lerp(pos.current.x, target.current.x, 0.4);
			pos.current.y = lerp(pos.current.y, target.current.y, 0.4);
			if (cursorRef.current) {
				cursorRef.current.style.transform = `translate3d(${pos.current.x - 4}px, ${pos.current.y - 4}px, 0)`;
			}
			raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);

		return () => {
			document.removeEventListener('mousemove', onMouse);
			cancelAnimationFrame(raf);
		};
	}, []);

	return (
		<div
			ref={cursorRef}
			className="pointer-events-none fixed top-0 left-0 z-9999 h-2 w-2 rounded-full"
			style={{
				background: 'var(--accent)',
				mixBlendMode: 'difference',
				willChange: 'transform',
			}}
		/>
	);
}
