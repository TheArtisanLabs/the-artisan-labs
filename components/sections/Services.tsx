'use client';

import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Section, SectionInner, SectionHeader } from '@/components/ui/Section';
import StaggerGroup from '@/components/ui/StaggerGroup';
import ServiceCard from '@/components/ui/ServiceCard';
import { useEffect } from 'react';

export default function Services() {
	const services = useQuery(api.services.getAll);
	const seedServices = useMutation(api.services.seed);

	useEffect(() => {
		if (services?.length === 0) {
			seedServices();
		}
	}, [services, seedServices]);

	return (
		<Section id="services">
			<SectionInner>
				<SectionHeader label="// what we craft" title="Services" />
				<div className="relative">
					<div
						className="pointer-events-none absolute -top-16 right-10 z-2 text-[clamp(80px,12vw,180px)] leading-none font-normal tracking-tighter select-none"
						style={{ color: 'var(--accent)', opacity: 0.12 }}
					>
						02
					</div>
					<StaggerGroup className="grid gap-6 md:grid-cols-2">
						{services?.map((s) => (
							<ServiceCard
								key={s._id}
								num={s.num}
								name={s.name}
								desc={s.desc}
							/>
						))}
					</StaggerGroup>
				</div>
			</SectionInner>
		</Section>
	);
}
