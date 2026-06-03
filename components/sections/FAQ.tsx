'use client';

import { useState } from 'react';
import { Section, SectionInner, SectionHeader } from '@/components/ui/Section';
import { cn } from '@/lib/utils';

const FAQS = [
	{
		q: 'How much does a typical project cost?',
		a: "It depends on scope and complexity. Most projects fall between $20K\u2013$80K. We'll give you a fixed-price or time-and-materials quote after a brief discovery call \u2014 no commitment, no sales pitch.",
	},
	{
		q: 'How long does it take to build an app?',
		a: 'A typical MVP takes 8\u201312 weeks. A full-featured product is usually 4\u20136 months. We work in two-week sprints with demos at the end of each so you can track progress and course-correct early.',
	},
	{
		q: 'Do you work with early-stage startups?',
		a: 'Yes \u2014 about half our clients are pre-seed or seed-stage. We can structure payment terms and scope to match your runway. We also offer technical co-founder services for teams that need architectural leadership.',
	},
	{
		q: 'What happens after launch?',
		a: "We offer ongoing maintenance, monitoring, and feature development retainers. You're never left with orphaned code \u2014 we document everything and can transition to your internal team when you're ready.",
	},
	{
		q: 'Do you sign NDAs?',
		a: "Always. We work with sensitive product ideas regularly. Your concept is yours \u2014 we're here to build it, not shop it around.",
	},
];

export default function FAQ() {
	const [openIdx, setOpenIdx] = useState<number | null>(null);

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
					{FAQS.map((faq, i) => (
						<div
							key={i}
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
