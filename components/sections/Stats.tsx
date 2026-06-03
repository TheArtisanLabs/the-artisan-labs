'use client';

import { useEffect, useRef, useState } from 'react';
import { Section, SectionInner } from '@/components/ui/Section';
import { cn } from '@/lib/utils';

const STATS = [
	{ target: 8, label: 'Years experience', plus: true },
	{ target: 50, label: 'Projects shipped', plus: true },
	{ target: 24, label: 'Happy clients', plus: true },
	{ target: 4, label: 'Core services', plus: false },
];

function StatCell({
	target,
	label,
	plus,
	visible,
}: {
	target: number;
	label: string;
	plus: boolean;
	visible: boolean;
}) {
	const [count, setCount] = useState(0);
	const animated = useRef(false);

	useEffect(() => {
		if (!visible || animated.current) return;
		animated.current = true;
		const duration = 1800;
		const startTime = performance.now();
		const raf = requestAnimationFrame(function step(now) {
			const progress = Math.min((now - startTime) / duration, 1);
			const eased = 1 - Math.pow(1 - progress, 3);
			setCount(Math.floor(eased * target));
			if (progress < 1) requestAnimationFrame(step);
			else setCount(target);
		});
		return () => cancelAnimationFrame(raf);
	}, [visible, target]);

	return (
		<div className="bg-(--bg) p-10 text-center transition-colors duration-300 hover:bg-(--accent-10)">
			<div className="font-heading mb-1 text-[clamp(32px,4vw,56px)] leading-none font-bold text-(--accent)">
				{count}
				{plus && (
					<span className="align-super text-[0.6em] text-(--fg-30)">
						+
					</span>
				)}
			</div>
			<div className="text-[11px] tracking-[1px] text-(--fg-50) uppercase">
				{label}
			</div>
		</div>
	);
}

export default function Stats() {
	const [visible, setVisible] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const obs = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setVisible(true);
					obs.disconnect();
				}
			},
			{ threshold: 0.5 }
		);
		obs.observe(el);
		return () => obs.disconnect();
	}, []);

	return (
		<Section id="stats">
			<SectionInner>
				<div
					ref={ref}
					className={cn(
						'grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-(--border) md:grid-cols-4',
						'opacity-0 translate-y-7.5 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]',
						visible && 'opacity-100 translate-y-0'
					)}
				>
					{STATS.map((s) => (
						<StatCell
							key={s.label}
							target={s.target}
							label={s.label}
							plus={s.plus}
							visible={visible}
						/>
					))}
				</div>
			</SectionInner>
		</Section>
	);
}
