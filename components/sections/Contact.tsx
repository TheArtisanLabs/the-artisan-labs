import { Section, SectionInner } from '@/components/ui/Section';
import Reveal from '@/components/ui/Reveal';

const SOCIALS = [
	{ label: 'GH', href: '#', aria: 'GitHub' },
	{ label: 'LI', href: '#', aria: 'LinkedIn' },
	{ label: 'X', href: '#', aria: 'Twitter/X' },
];

export default function Contact() {
	return (
		<Section id="contact" className="text-center">
			<SectionInner>
				<Reveal>
					<span className="mb-4 block text-[13px] tracking-[3px] text-(--accent) uppercase">
						{"// let's build"}
					</span>
					<h2 className="font-heading mb-4 text-[clamp(28px,5vw,56px)] leading-tight font-normal tracking-widest text-(--fg)">
						Got something to build?
					</h2>
					<a
						href="mailto:hello@artisanlabs.dev"
						className="mb-10 inline-flex items-center gap-2 rounded-lg border border-(--accent-20) px-6 py-3 text-[clamp(16px,2vw,22px)] text-(--fg-50) transition-all duration-300 hover:border-(--accent) hover:bg-(--accent-10) hover:text-(--accent)"
					>
						<span className="font-normal text-(--accent)">
							&gt;
						</span>
						hello@artisanlabs.dev
					</a>
					<div className="flex items-center justify-center gap-4">
						{SOCIALS.map((s) => (
							<a
								key={s.label}
								href={s.href}
								className="flex h-11 w-11 items-center justify-center rounded-full border border-(--fg-20) text-sm font-medium text-(--fg-50) transition-all duration-300 hover:border-(--accent) hover:bg-(--accent-10) hover:text-(--accent)"
								aria-label={s.aria}
							>
								{s.label}
							</a>
						))}
					</div>
				</Reveal>
			</SectionInner>
		</Section>
	);
}
