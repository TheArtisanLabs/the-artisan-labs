import { cn } from '@/lib/utils';

interface PortfolioCardProps {
	name: string;
	thumb: string;
	tags: string[];
	tall: boolean;
	full: boolean;
	bg: string;
}

export default function PortfolioCard({
	name,
	thumb,
	tags,
	tall,
	full,
	bg,
}: PortfolioCardProps) {
	return (
		<div
			className={cn(
				'stagger-item translate-y-5 overflow-hidden rounded-xl border border-(--accent-20) bg-(--bg) opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-(--accent) [&.visible]:translate-y-0 [&.visible]:opacity-100',
				full && 'col-span-full'
			)}
		>
			<div
				className={cn(
					'flex items-center justify-center overflow-hidden',
					tall ? 'h-70' : 'h-50',
					full && 'h-45'
				)}
				style={{ background: bg }}
			>
				<span className="text-[28px] font-normal tracking-tight text-(--accent-30)">
					{thumb}
				</span>
			</div>
			<div className="px-6 py-5">
				<h3 className="font-heading mb-2 text-base font-thin tracking-widest text-(--fg) transition-colors duration-300">
					{name}
				</h3>
				<div className="flex flex-wrap gap-2">
					{tags.map((t) => (
						<span
							key={t}
							className="rounded-sm border border-(--accent-20) px-2.5 py-0.75 text-[11px] text-(--fg-50) transition-all duration-300"
						>
							{`\`${t}\``}
						</span>
					))}
				</div>
			</div>
		</div>
	);
}
