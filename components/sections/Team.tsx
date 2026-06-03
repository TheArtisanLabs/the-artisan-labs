'use client';

import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Section, SectionInner, SectionHeader } from '@/components/ui/Section';
import StaggerGroup from '@/components/ui/StaggerGroup';
import TeamCard from '@/components/ui/TeamCard';
import { useEffect } from 'react';

export default function Team() {
	const members = useQuery(api.team.getAll);
	const seedTeam = useMutation(api.team.seed);

	useEffect(() => {
		if (members?.length === 0) {
			seedTeam();
		}
	}, [members, seedTeam]);

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
					{members?.map((m) => (
						<TeamCard
							key={m._id}
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
