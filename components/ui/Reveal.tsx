'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

type RevealProps = {
	children: ReactNode;
	className?: string;
	threshold?: number;
	as?: 'div' | 'section';
};

export default function Reveal({
	children,
	className,
	threshold = 0.15,
}: RevealProps) {
	const ref = useRef<HTMLDivElement>(null);
	const done = useRef(false);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		done.current = false;

		const show = () => {
			el.classList.add('visible');
			done.current = true;
		};

		const obs = new IntersectionObserver(
			(entries) => {
				for (const e of entries) {
					if (e.isIntersecting) show();
				}
			},
			{ threshold }
		);
		obs.observe(el);

		const mo = new MutationObserver(() => {
			if (done.current) return;
			const rect = el.getBoundingClientRect();
			if (rect.top < window.innerHeight && rect.bottom > 0) {
				show();
			}
		});
		mo.observe(el, { childList: true, subtree: true });

		const raf = requestAnimationFrame(() => {
			if (done.current) return;
			const rect = el.getBoundingClientRect();
			if (rect.top < window.innerHeight - 1 && rect.bottom > 1) {
				show();
			}
		});

		return () => {
			obs.disconnect();
			mo.disconnect();
			cancelAnimationFrame(raf);
		};
	}, [threshold]);

	return (
		<div
			ref={ref}
			className={cn(
				'translate-y-7.5 opacity-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] [&.visible]:translate-y-0 [&.visible]:opacity-100',
				className
			)}
		>
			{children}
		</div>
	);
}
