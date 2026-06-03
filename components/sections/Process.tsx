'use client';

import { Section, SectionInner, SectionHeader } from '@/components/ui/Section';
import StaggerGroup from '@/components/ui/StaggerGroup';
import ProcessCard from '@/components/ui/ProcessCard';

const STEPS = [
	{
		num: '[01]',
		icon: '\u2615',
		name: 'Discover',
		desc: "We learn your domain, your users, and your constraints. No assumptions \u2014 just research, interviews, and a shared understanding of what success looks like.",
	},
	{
		num: '[02]',
		icon: '\u25C6',
		name: 'Design',
		desc: "Interactive prototypes, not static mockups. We validate flows and interactions before writing a line of production code. You see it working before we build it.",
	},
	{
		num: '[03]',
		icon: '\u2699',
		name: 'Build',
		desc: "Clean architecture, thorough tests, daily builds. We ship incrementally so you can touch working software at every stage \u2014 no black boxes, no surprise rewrites.",
	},
	{
		num: '[04]',
		icon: '\u25B2',
		name: 'Launch & grow',
		desc: "Deployment, monitoring, and post-launch support. We stay with you after go-live to handle edge cases, iterate on feedback, and keep the product healthy.",
	},
];

export default function Process() {
	return (
		<Section id="process">
			<SectionInner>
				<div className="relative">
					<div
						className="pointer-events-none absolute -top-16 right-10 z-2 text-[clamp(80px,12vw,180px)] leading-none font-normal tracking-tighter select-none"
						style={{ color: 'var(--accent)', opacity: 0.12 }}
					>
						02
					</div>
					<SectionHeader label="// how we work" title="The process" />
				</div>
				<p className="mb-12 max-w-140 text-sm leading-relaxed text-(--fg-50)">
					From idea to launch, we follow a proven rhythm that keeps
					every project on track and every detail accounted for.
				</p>
				<StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
					{STEPS.map((s) => (
						<ProcessCard
							key={s.num}
							num={s.num}
							icon={s.icon}
							name={s.name}
							desc={s.desc}
						/>
					))}
				</StaggerGroup>
			</SectionInner>
		</Section>
	);
}
