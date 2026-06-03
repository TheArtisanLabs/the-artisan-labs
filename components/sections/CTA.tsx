import { Section, SectionInner } from '@/components/ui/Section';
import Reveal from '@/components/ui/Reveal';

export default function CTA() {
	return (
		<Section id="cta">
			<SectionInner>
				<Reveal className="rounded-xl border border-(--border) bg-(--bg) px-12 py-14 text-center">
					<h2 className="font-heading mb-2 text-[clamp(24px,3vw,36px)] font-normal tracking-widest text-(--fg)">
						Ready to build something?
					</h2>
					<p className="mx-auto mb-8 max-w-125 text-sm text-(--fg-50)">
						Tell us about your project and we&apos;ll put together a
						free, no-obligation proposal within 48 hours.
					</p>
					<div className="flex flex-wrap justify-center gap-4">
						<a
							href="#contact"
							className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-(--accent) px-7 py-3.5 font-mono text-[13px] font-medium tracking-[1px] text-(--fg) uppercase no-underline transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#4C6ED0] hover:shadow-[0_8px_24px_rgba(64,98,187,0.15)]"
						>
							Start the conversation &rarr;
						</a>
						<a
							href="#portfolio"
							className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-(--border) bg-transparent px-7 py-3.5 font-mono text-[13px] tracking-[1px] text-(--fg-70) uppercase no-underline transition-all duration-300 hover:border-(--fg-30) hover:bg-(--fg-10) hover:text-(--fg)"
						>
							See our work first
						</a>
					</div>
				</Reveal>
			</SectionInner>
		</Section>
	);
}
