import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

type SectionProps = {
	children: ReactNode;
	id?: string;
	className?: string;
};

export function Section({ children, id, className }: SectionProps) {
	return (
		<section id={id} className={cn('py-30 md:py-20', className)}>
			{children}
		</section>
	);
}

export function SectionInner({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	return (
		<div className={cn('mx-auto max-w-300 px-6', className)}>
			{children}
		</div>
	);
}

export function SectionHeader({
	label,
	title,
	className,
}: {
	label: string;
	title: string;
	className?: string;
}) {
	return (
		<div className={cn('mb-6', className)}>
			<span className="mb-4 block text-[13px] tracking-[3px] text-(--accent) uppercase">
				{label}
			</span>
			<h2 className="font-heading text-[clamp(28px,4vw,48px)] leading-tight font-normal tracking-widest text-(--fg)">
				{title}
			</h2>
		</div>
	);
}
