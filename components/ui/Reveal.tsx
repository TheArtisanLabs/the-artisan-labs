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

	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const obs = new IntersectionObserver(
			(entries) => {
				entries.forEach((e) => {
					if (e.isIntersecting) {
						e.target.classList.add('visible');
						obs.unobserve(e.target);
					}
				});
			},
			{ threshold }
		);
		obs.observe(el);
		return () => obs.disconnect();
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
