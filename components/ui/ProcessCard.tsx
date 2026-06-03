interface ProcessCardProps {
	num: string;
	icon: string;
	name: string;
	desc: string;
}

export default function ProcessCard({
	num,
	icon,
	name,
	desc,
}: ProcessCardProps) {
	return (
		<div className="stagger-item group relative translate-y-5 overflow-hidden rounded-xl border border-(--border) bg-(--bg) p-8 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-(--accent-40) hover:shadow-[0_12px_32px_rgba(64,98,187,0.15)] [&.visible]:translate-y-0 [&.visible]:opacity-100">
			<div className="absolute top-0 left-0 h-0 w-0.75 bg-(--accent) transition-all duration-400 group-hover:h-full" />
			<span className="mb-4 block text-[11px] font-medium tracking-[1px] text-(--accent)">
				{num}
			</span>
			<div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md border border-(--border) text-base text-(--accent) transition-all duration-300 group-hover:border-(--accent-40) group-hover:bg-(--accent-10)">
				{icon}
			</div>
			<h3 className="font-heading mb-2 text-lg font-thin tracking-widest text-(--fg)">
				{name}
			</h3>
			<p className="text-[12.5px] leading-relaxed text-(--fg-50)">
				{desc}
			</p>
		</div>
	);
}
