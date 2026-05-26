'use client';

import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { SectionInner } from '@/components/ui/Section';
import { useEffect } from 'react';

export default function Stack() {
	const tech = useQuery(api.stack.getAll);
	const seedStack = useMutation(api.stack.seed);

	useEffect(() => {
		if (tech?.length === 0) {
			seedStack();
		}
	}, [tech, seedStack]);

	const items = tech ? [...tech, ...tech] : [];

	return (
		<section
			id="stack"
			className="relative overflow-hidden bg-(--bg) py-20"
		>
			<div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,rgba(64,98,187,0.3)_2px,rgba(64,98,187,0.3)_3px)] opacity-[0.04]" />
			<SectionInner>
				<span className="mb-4 block text-[13px] tracking-[3px] text-(--accent) uppercase">
					{'// technologies we trust'}
				</span>
				<div
					className="pointer-events-none absolute top-1/2 left-1/2 z-2 flex -translate-x-1/2 -translate-y-1/2 text-[clamp(80px,12vw,180px)] leading-none font-normal tracking-tighter select-none"
					style={{ color: 'var(--accent)', opacity: 0.12 }}
				>
					04
				</div>
				<div className="mt-8 w-full overflow-hidden">
					<div className="flex w-max animate-[tickerScroll_40s_linear_infinite]">
						<div className="flex items-center gap-12 px-6 text-[clamp(14px,1.5vw,18px)] whitespace-nowrap text-(--fg-50)">
							{items.map((t, i) => (
								<span key={`${t._id}-${i}`}>
									<span className="transition-colors duration-300 hover:text-(--accent)">
										{t.name}
									</span>
									{i < items.length - 1 && (
										<span className="text-(--accent-20)">
											{' '}
											·{' '}
										</span>
									)}
								</span>
							))}
						</div>
					</div>
				</div>
			</SectionInner>
		</section>
	);
}
