'use client';

import { Section, SectionInner } from '@/components/ui/Section';
import Reveal from '@/components/ui/Reveal';

export default function About() {
	return (
		<Section id="about">
			<SectionInner>
				<Reveal className="grid grid-cols-1 items-start gap-6 md:grid-cols-[1fr_2fr] md:gap-15">
					<div
						className="text-[clamp(80px,12vw,180px)] leading-none font-normal tracking-tighter select-none"
						style={{ color: 'var(--accent)', opacity: 0.12 }}
					>
						01
					</div>
					<div>
						<span className="mb-4 block text-[13px] tracking-[3px] text-(--accent) uppercase">
							{'// who we are'}
						</span>
						<h2 className="font-heading mb-6 text-[clamp(28px,4vw,48px)] leading-tight font-normal tracking-widest text-(--fg)">
							About
						</h2>
						<p className="max-w-160 text-[clamp(15px,1.2vw,18px)] text-(--fg-80)">
							We're The Artisan Labs — a tight-knit crew of
							builders who genuinely care about the work. No
							bloated teams, no endless handoffs. Just six people
							who each know their craft inside out, working
							together to ship products that look great, run
							smoothly, and actually solve problems. Whether you
							need a website, a web app, or a mobile app, we've
							got you covered from first line of code to launch
							day.
						</p>
					</div>
				</Reveal>
			</SectionInner>
		</Section>
	);
}
