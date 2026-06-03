'use client';

import { useState, useEffect } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Section, SectionInner, SectionHeader } from '@/components/ui/Section';
import { cn } from '@/lib/utils';

export default function FAQ() {
	const faqs = useQuery(api.faq.getAll);
	const seedFaq = useMutation(api.faq.seed);

	const [openIdx, setOpenIdx] = useState<number | null>(null);

	useEffect(() => {
		if (faqs?.length === 0) {
			seedFaq();
		}
	}, [faqs, seedFaq]);

	return (
		<Section id="faq">
			<SectionInner>
				<div className="relative">
					<div
						className="pointer-events-none absolute -top-16 right-10 z-2 text-[clamp(80px,12vw,180px)] leading-none font-normal tracking-tighter select-none"
						style={{ color: 'var(--accent)', opacity: 0.12 }}
					>
						07
					</div>
					<SectionHeader label="// common questions" title="FAQ" />
				</div>
				<div className="mx-auto max-w-190">
					{faqs?.map((faq, i) => (
						<div
							key={faq._id}
							className="cursor-pointer border-b border-(--border) py-5"
							onClick={() =>
								setOpenIdx(openIdx === i ? null : i)
							}
						>
							<div className="flex select-none items-center justify-between gap-6">
								<span className="font-heading text-[17px] leading-tight font-thin tracking-widest text-(--fg)">
									{faq.q}
								</span>
								<span
									className={cn(
										'relative h-6 w-6 shrink-0 transition-transform duration-300',
										openIdx === i && 'rotate-45'
									)}
								>
									<span className="absolute top-1 left-2.75 h-4 w-0.5 rounded-sm bg-(--fg-50)" />
									<span className="absolute top-2.75 left-1 h-0.5 w-4 rounded-sm bg-(--fg-50)" />
								</span>
							</div>
							<div
								className={cn(
									'overflow-hidden transition-all duration-400 ease',
									openIdx === i
										? 'max-h-75 pt-4'
										: 'max-h-0 pt-0'
								)}
							>
								<p className="text-sm leading-relaxed text-(--fg-50)">
									{faq.a}
								</p>
							</div>
						</div>
					))}
				</div>
			</SectionInner>
		</Section>
	);
}
