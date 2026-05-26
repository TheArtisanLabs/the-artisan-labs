import { SectionInner } from '@/components/ui/Section';

const TECH = [
	'React',
	'Next.js',
	'TypeScript',
	'Flutter',
	'Node',
	'Figma',
	'Swift',
	'PostgreSQL',
	'Tailwind',
	'Firebase',
];

export default function Stack() {
	const items = [...TECH, ...TECH];

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
				<div className="mt-8 w-full overflow-hidden">
					<div className="flex w-max animate-[tickerScroll_40s_linear_infinite]">
						<div className="flex items-center gap-12 px-6 text-[clamp(14px,1.5vw,18px)] whitespace-nowrap text-(--fg-50)">
							{items.map((t, i) => (
								<span key={`${t}-${i}`}>
									<span className="transition-colors duration-300 hover:text-(--accent)">
										{t}
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
