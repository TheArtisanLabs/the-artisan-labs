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

	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const obs = new IntersectionObserver(
			(entries) => {
				entries.forEach((e) => {
					if (e.isIntersecting) {
						const items =
							e.target.querySelectorAll('.stagger-item');
						items.forEach((item, i) => {
							setTimeout(
								() => item.classList.add('visible'),
								i * staggerDelay
							);
						});
						obs.unobserve(e.target);
					}
				});
			},
			{ threshold }
		);
		obs.observe(el);
		return () => obs.disconnect();
	}, [threshold, staggerDelay]);

	return (
		<div ref={ref} className={cn(className)}>
			{children}
		</div>
	);
}
