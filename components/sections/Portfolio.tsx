import { cn } from '@/lib/utils';
import { Section, SectionInner, SectionHeader } from '@/components/ui/Section';
import StaggerGroup from '@/components/ui/StaggerGroup';

const PROJECTS = [
	{
		name: 'Project Foundry',
		thumb: 'PF',
		tags: ['React', 'Node', 'PostgreSQL'],
		tall: true,
		bg: '#252E2B',
	},
	{
		name: 'Sylva',
		thumb: 'SV',
		tags: ['Flutter', 'Firebase'],
		tall: false,
		bg: '#232D2F',
	},
	{
		name: 'Deck Chair',
		thumb: 'DC',
		tags: ['Next.js', 'TypeScript', 'Tailwind'],
		full: true,
		bg: '#22302C',
	},
];

export default function Portfolio() {
	return (
		<Section id="portfolio">
			<SectionInner>
				<SectionHeader label="// selected work" title="Portfolio" />
				<StaggerGroup className="grid grid-cols-[2fr_1fr] gap-6 md:grid-cols-1">
					{PROJECTS.map((p) => (
						<div
							key={p.name}
							className={cn(
								'stagger-item translate-y-5 overflow-hidden rounded-xl border border-(--accent-20) bg-(--bg) opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-(--accent) [&.visible]:translate-y-0 [&.visible]:opacity-100',
								p.full && 'col-span-full'
							)}
						>
							<div
								className={cn(
									'flex items-center justify-center overflow-hidden',
									p.tall ? 'h-70' : 'h-50',
									p.full && 'h-45'
								)}
								style={{ background: p.bg }}
							>
								<span className="text-[28px] font-bold tracking-tight text-(--accent-30)">
									{p.thumb}
								</span>
							</div>
							<div className="px-6 py-5">
								<h3 className="mb-2 text-base font-bold text-(--fg) transition-colors duration-300">
									{p.name}
								</h3>
								<div className="flex flex-wrap gap-2">
									{p.tags.map((t) => (
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
					))}
				</StaggerGroup>
			</SectionInner>
		</Section>
	);
}
