interface TeamCardProps {
	initials: string;
	name: string;
	role: string;
	bio: string;
}

export default function TeamCard({
	initials,
	name,
	role,
	bio,
}: TeamCardProps) {
	return (
		<div className="stagger-item flex translate-y-5 items-start gap-5 rounded-xl border border-(--border) bg-(--bg) p-6 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.75 hover:border-(--accent-40) [&.visible]:translate-y-0 [&.visible]:opacity-100">
			<div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-(--border) bg-(--bg) font-heading text-xl font-bold text-(--accent)">
				{initials}
			</div>
			<div>
				<h3 className="font-heading mb-0.5 text-base font-thin tracking-widest text-(--fg)">
					{name}
				</h3>
				<p className="mb-1.5 text-[11px] tracking-[1px] text-(--accent) uppercase">
					{role}
				</p>
				<p className="text-[12px] leading-relaxed text-(--fg-50)">{bio}</p>
			</div>
		</div>
	);
}
