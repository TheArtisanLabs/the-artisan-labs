'use client';

import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Section, SectionInner, SectionHeader } from '@/components/ui/Section';
import StaggerGroup from '@/components/ui/StaggerGroup';
import ProcessCard from '@/components/ui/ProcessCard';
import { useEffect } from 'react';

export default function Process() {
	const steps = useQuery(api.process.getAll);
	const seedProcess = useMutation(api.process.seed);

	useEffect(() => {
		if (steps?.length === 0) {
			seedProcess();
		}
	}, [steps, seedProcess]);

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
				<p className="mb-12 max-w-140 text-[clamp(15px,1.2vw,18px)] text-(--fg-80)">
					From idea to launch, we follow a proven rhythm that keeps
					every project on track and every detail accounted for.
				</p>
				<StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
					{steps?.map((s) => (
						<ProcessCard
							key={s._id}
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
