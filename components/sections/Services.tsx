import { Section, SectionInner, SectionHeader } from '@/components/ui/Section';
import StaggerGroup from '@/components/ui/StaggerGroup';

const SERVICES = [
	{
		num: '[ 01 ]',
		name: 'Web Apps',
		desc: 'Full-stack applications built to scale. From SPAs to server-rendered platforms, we ship production-grade frontends and backends.',
	},
	{
		num: '[ 02 ]',
		name: 'Mobile Apps',
		desc: 'Cross-platform and native mobile experiences. Flutter, Swift, Kotlin — whatever fits the problem, not the resume.',
	},
	{
		num: '[ 03 ]',
		name: 'UI/UX Design',
		desc: 'Interaction design that respects the user. Prototypes, design systems, micro-animations, and interfaces that feel considered.',
	},
	{
		num: '[ 04 ]',
		name: 'Custom Software',
		desc: "One-off tools, internal platforms, automation pipelines. If it doesn't exist yet, we'll build it.",
	},
];

export default function Services() {
	return (
		<Section id="services">
			<SectionInner>
				<SectionHeader label="// what we craft" title="Services" />
				<StaggerGroup className="grid grid-cols-2 gap-6">
					{SERVICES.map((s) => (
						<div
							key={s.num}
							className="stagger-item translate-y-5 rounded-xl border border-(--accent-30) bg-(--bg) p-8 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-(--accent) hover:shadow-[0_12px_40px_rgba(64,98,187,0.1)] [&.visible]:translate-y-0 [&.visible]:opacity-100"
						>
							<span className="mb-3 block text-xs tracking-wider text-(--accent)">
								{s.num}
							</span>
							<h3 className="mb-2 text-xl font-bold text-(--fg)">
								{s.name}
							</h3>
							<p className="text-sm leading-relaxed text-(--fg-50)">
								{s.desc}
							</p>
						</div>
					))}
				</StaggerGroup>
			</SectionInner>
		</Section>
	);
}
