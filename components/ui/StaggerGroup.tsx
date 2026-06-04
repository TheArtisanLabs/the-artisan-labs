'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

type StaggerGroupProps = {
	children: ReactNode;
	className?: string;
	threshold?: number;
	staggerDelay?: number;
};

export default function StaggerGroup({
	children,
	className,
	threshold = 0.1,
	staggerDelay = 140,
}: StaggerGroupProps) {
	const ref = useRef<HTMLDivElement>(null);
	const done = useRef(false);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		done.current = false;

		const show = (): boolean => {
			if (done.current) return true;
			const items = el.querySelectorAll('.stagger-item');
			if (!items.length) return false;
			done.current = true;
			items.forEach((item, i) => {
				setTimeout(
					() => item.classList.add('visible'),
					i * staggerDelay
				);
			});
			return true;
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
			const items = el.querySelectorAll('.stagger-item');
			if (!items.length) return;
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
	}, [threshold, staggerDelay]);

	return (
		<div ref={ref} className={cn(className)}>
			{children}
		</div>
	);
}
