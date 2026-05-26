'use client';

import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Section, SectionInner, SectionHeader } from '@/components/ui/Section';
import StaggerGroup from '@/components/ui/StaggerGroup';
import PortfolioCard from '@/components/ui/PortfolioCard';
import { useEffect } from 'react';

export default function Portfolio() {
	const projects = useQuery(api.portfolio.getAll);
	const seedPortfolio = useMutation(api.portfolio.seed);

	useEffect(() => {
		if (projects?.length === 0) {
			seedPortfolio();
		}
	}, [projects, seedPortfolio]);

	return (
		<Section id="portfolio">
			<SectionInner>
				<SectionHeader label="// selected work" title="Portfolio" />
				<div className="relative">
					<div
						className="pointer-events-none absolute inset-x-0 -top-24 z-2 text-[clamp(80px,12vw,180px)] leading-none font-normal tracking-tighter select-none"
						style={{ color: 'var(--accent)', opacity: 0.12 }}
					>
						03
					</div>
					<StaggerGroup className="grid grid-cols-1 gap-6 md:grid-cols-[2fr_1fr]">
						{projects?.map((p) => (
							<PortfolioCard
								key={p._id}
								name={p.name}
								thumb={p.thumb}
								tags={p.tags}
								tall={p.tall}
								full={p.full}
								bg={p.bg}
							/>
						))}
					</StaggerGroup>
				</div>
			</SectionInner>
		</Section>
	);
}
