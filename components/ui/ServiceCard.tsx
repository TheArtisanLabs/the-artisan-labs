interface ServiceCardProps {
	num: string;
	name: string;
	desc: string;
}

export default function ServiceCard({ num, name, desc }: ServiceCardProps) {
	return (
		<div className="stagger-item translate-y-5 rounded-xl border border-(--accent-30) bg-(--bg) p-8 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-(--accent) hover:shadow-[0_12px_40px_rgba(64,98,187,0.1)] [&.visible]:translate-y-0 [&.visible]:opacity-100">
			<span className="mb-3 block text-xs tracking-wider text-(--accent)">
				{num}
			</span>
			<h3 className="font-heading ext-xl mb-2 font-normal tracking-widest text-(--fg)">
				{name}
			</h3>
			<p className="text-sm leading-relaxed text-(--fg-50)">{desc}</p>
		</div>
	);
}
