import Image from 'next/image';

export default function Footer() {
	return (
		<footer className="border-t border-(--border) px-6 py-10">
			<div className="mx-auto flex max-w-300 items-center justify-center gap-3 text-xs text-(--fg-50)">
				<Image
					src="/images/logo/logo-transparent.png"
					alt=""
					aria-hidden="true"
					width={526}
					height={526}
					className="h-5 w-auto opacity-40"
				/>
				<p>&copy; 2026 Artisan Labs. Built with intent.</p>
			</div>
		</footer>
	);
}
