'use client';

import { Section, SectionInner, SectionHeader } from '@/components/ui/Section';
import StaggerGroup from '@/components/ui/StaggerGroup';
import TeamCard from '@/components/ui/TeamCard';

const MEMBERS = [
	{
		initials: 'JD',
		name: 'Jules Desmarais',
		role: 'Founder & Lead Developer',
		bio: 'Full-stack engineer with a design sensibility. 15 years building for startups and enterprises. Rust, React, and systems thinking.',
	},
	{
		initials: 'AN',
		name: 'Aiko Nakamura',
		role: 'Mobile & Frontend Lead',
		bio: 'Flutter and Swift specialist who obsesses over animation curves and gesture handling. Previously at a top-50 App Store publisher.',
	},
	{
		initials: 'TR',
		name: 'Tom\u00e1s Reyes',
		role: 'Backend & Infrastructure',
		bio: 'Distributed systems, databases, and DevOps. Keeps the production stack boring and reliable so the fun stuff works at scale.',
	},
	{
		initials: 'EL',
		name: 'Elena Larsson',
		role: 'Product Designer',
		bio: 'Design systems, interaction design, and user research. Bridges the gap between what stakeholders ask for and what users actually need.',
	},
];

export default function Team() {
	return (
		<Section id="team">
			<SectionInner>
				<div className="relative">
					<div
						className="pointer-events-none absolute -top-16 right-10 z-2 text-[clamp(80px,12vw,180px)] leading-none font-normal tracking-tighter select-none"
						style={{ color: 'var(--accent)', opacity: 0.12 }}
					>
						05
					</div>
					<SectionHeader label="// the humans" title="Team" />
				</div>
				<p className="mb-12 max-w-140 text-sm leading-relaxed text-(--fg-50)">
					A small, focused crew with big-range skills. No account
					managers — just builders.
				</p>
				<StaggerGroup className="grid gap-6 md:grid-cols-2">
					{MEMBERS.map((m) => (
						<TeamCard
							key={m.initials}
							initials={m.initials}
							name={m.name}
							role={m.role}
							bio={m.bio}
						/>
					))}
				</StaggerGroup>
			</SectionInner>
		</Section>
	);
}
