'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const PHRASES = ['about_us', 'who_we_are', 'our_story'];

const TIMELINE = [
	{
		date: 'FOUNDED',
		log: '[INIT]',
		title: 'Six people, one belief',
		desc: 'No bloated teams. No endless handoffs. Just six people who each know their craft inside out, working together from day one.',
		tags: ['`tight-knit`', '`craft`'],
		delay: 0,
	},
	{
		date: 'EVERY PROJECT',
		log: '[SHIP]',
		title: 'Websites, web apps, mobile apps',
		desc: 'From first line of code to launch day — we cover the full stack. Products that look great, run smoothly, and actually solve problems.',
		tags: ['`full-stack`', '`mobile`', '`web`'],
		delay: 150,
	},
	{
		date: 'NOW — 2026',
		log: '[CONTINUOUS]',
		title: 'Still building, still tight-knit',
		desc: "We're not chasing scale for scale's sake. The work is what matters — and six people who genuinely care is all it takes to ship great products.",
		tags: ['`sustainable`', '`quality`'],
		delay: 300,
	},
];

const VALUES = [
	{
		num: '[ 01 ]',
		icon: '>_',
		name: 'Monochrome by choice',
		desc: 'Every pixel in our work carries intent. Fewer colors mean more attention where it matters. One accent. One typeface. Zero noise.',
		stat: '%',
		target: 100,
		label: 'Monochromatic output',
		glitch: 'repeating-linear-gradient(0deg,transparent,transparent 2px,var(--accent) 2px,var(--accent) 4px)',
	},
	{
		num: '[ 02 ]',
		icon: '#!',
		name: 'Deep over fast',
		desc: 'We optimize for longevity, not velocity. Thoughtful architecture beats rushed features every time. Our average project lifespan: 4+ years.',
		stat: '+ yrs',
		target: 4,
		label: 'Average project lifecycle',
		glitch: 'repeating-linear-gradient(90deg,transparent,transparent 3px,var(--accent) 3px,var(--accent) 4px)',
	},
	{
		num: '[ 03 ]',
		icon: '~/$',
		name: 'Written culture',
		desc: "Async by default. Everything is documented, every decision has a rationale. We write because we respect each other's focus time.",
		stat: '%',
		target: 100,
		label: 'Async-first communication',
		glitch: 'repeating-linear-gradient(-45deg,transparent,transparent 2px,var(--accent) 2px,var(--accent) 3px)',
	},
];

const SAMPLES = [
	{
		tags: ['web app', 'dashboard'],
		name: 'Pulse Analytics',
		desc: 'Real-time business intelligence dashboard for a Series A SaaS company. From zero to launch in 14 weeks.',
		type: 'grid',
	},
	{
		tags: ['mobile', 'iOS'],
		name: 'Nova — AI companion',
		desc: 'Privacy-first AI assistant app, built with on-device ML. Featured in the App Store\'s "Apps We Love" collection.',
		type: 'bars',
	},
	{
		tags: ['platform', 'API'],
		name: 'Meridian API',
		desc: 'B2B payment infrastructure platform handling $12M+ in monthly transaction volume. 99.97% uptime since launch.',
		type: 'chart',
	},
];

const TEAM = [
	{
		initials: 'AC',
		name: 'Alex Chen',
		role: 'Founder / Engineering',
		bio: 'Systems thinker. Writes Rust for fun. Believes good architecture is the best form of documentation.',
		tags: ['`rust`', '`distributed`'],
		svg: <polygon points="30,4 56,17 56,43 30,56 4,43 4,17" />,
		inner: <circle cx="30" cy="26" r="8" />,
		path: <path d="M18 42c0-6.627 5.373-12 12-12s12 5.373 12 12" />,
	},
	{
		initials: 'MO',
		name: 'Maya Ortiz',
		role: 'Design Director',
		bio: 'Pixel obsessive. Curates every micro-interaction. Once redesigned a button 23 times and the 23rd was the one.',
		tags: ['`interaction`', '`systems`'],
		svg: <circle cx="30" cy="30" r="26" />,
		inner: <circle cx="30" cy="22" r="8" />,
		path: <path d="M16 44c0-7.732 6.268-14 14-14s14 6.268 14 14" />,
	},
	{
		initials: 'JK',
		name: 'James Kwon',
		role: 'Full-Stack Lead',
		bio: 'Full-stack generalist with an eye for performance. Can debug a memory leak in prod while sketching a component tree.',
		tags: ['`react`', '`node`'],
		svg: <rect x="8" y="8" width="44" height="44" rx="4" />,
		inner: <circle cx="30" cy="22" r="7" />,
		path: <path d="M16 44c0-7.732 6.268-14 14-14s14 6.268 14 14" />,
	},
	{
		initials: 'PS',
		name: 'Priya Singh',
		role: 'Mobile Lead',
		bio: 'Flutter and Swift native. Ships apps that feel faster than they should. Also runs our internal open-source guild.',
		tags: ['`flutter`', '`swift`'],
		svg: <path d="M30 4 L56 30 L30 56 L4 30 Z" />,
		inner: <circle cx="30" cy="24" r="7" />,
		path: <path d="M18 42c0-6.627 5.373-12 12-12s12 5.373 12 12" />,
	},
	{
		initials: 'OH',
		name: 'Omar Hassan',
		role: 'Backend & DevOps',
		bio: 'Infrastructure whisperer. Keeps everything running so the rest of us can sleep. Terraform by day, Go by night.',
		tags: ['`go`', '`infra`'],
		svg: <path d="M18 6 L54 18 L54 42 L18 54 L6 42 L6 18 Z" />,
		inner: <circle cx="28" cy="26" r="7" />,
		path: <path d="M16 44c0-6.627 5.373-12 12-12s12 5.373 12 12" />,
	},
	{
		initials: 'LP',
		name: 'Lena Park',
		role: 'Product & Strategy',
		bio: 'Translates ambiguous briefs into clear specs. Makes sure every project solves the right problem — not just the one we were asked to solve.',
		tags: ['`strategy`', '`product`'],
		svg: <circle cx="30" cy="30" r="24" strokeDasharray="4 4" />,
		inner: <circle cx="30" cy="22" r="7" />,
		path: <path d="M18 44c0-6.627 5.373-12 12-12s12 5.373 12 12" />,
	},
];

/* ------------------------------------------------------------------ */
/*  Hooks                                                              */
/* ------------------------------------------------------------------ */

function useTypewriter(phrases: string[]) {
	const [text, setText] = useState('');
	const idx = useRef(0);
	const ci = useRef(0);
	const del = useRef(false);
	const tickRef = useRef<() => void>(undefined);

	const tick = useCallback(() => {
		if (phrases.length === 0) return;
		const p = phrases[idx.current];
		if (del.current) {
			if (ci.current === 0) {
				del.current = false;
				idx.current = (idx.current + 1) % phrases.length;
				setTimeout(tickRef.current!, 400);
				return;
			}
			ci.current--;
			setText(p.substring(0, ci.current));
		} else {
			if (ci.current === p.length) {
				setTimeout(() => {
					del.current = true;
					tickRef.current!();
				}, 1800);
				return;
			}
			ci.current++;
			setText(p.substring(0, ci.current));
		}
		setTimeout(
			tickRef.current!,
			del.current ? 30 : 70 + Math.random() * 60
		);
	}, [phrases]);

	useEffect(() => {
		tickRef.current = tick;
	});

	useEffect(() => {
		const t = setTimeout(() => tickRef.current!(), 600);
		return () => clearTimeout(t);
	}, []);

	return text;
}

/* ------------------------------------------------------------------ */
/*  Particle Canvas                                                    */
/* ------------------------------------------------------------------ */

function Particles({ className }: { className?: string }) {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		let W = 0,
			H = 0;
		const COUNT = 60;
		const CONNECTION_DIST = 150;

		const resize = () => {
			W = canvas.width = canvas.parentElement!.offsetWidth;
			H = canvas.height = canvas.parentElement!.offsetHeight;
		};
		resize();
		window.addEventListener('resize', resize);

		const particles: {
			x: number;
			y: number;
			vx: number;
			vy: number;
			r: number;
		}[] = [];

		for (let i = 0; i < COUNT; i++) {
			particles.push({
				x: Math.random() * W,
				y: Math.random() * H,
				vx: (Math.random() - 0.5) * 0.4,
				vy: (Math.random() - 0.5) * 0.4,
				r: 1 + Math.random() * 1.5,
			});
		}

		let raf: number;
		const draw = () => {
			ctx!.clearRect(0, 0, W, H);
			for (let i = 0; i < particles.length; i++) {
				const p = particles[i];
				p.x += p.vx;
				p.y += p.vy;
				if (p.x < 0) p.x = W;
				if (p.x > W) p.x = 0;
				if (p.y < 0) p.y = H;
				if (p.y > H) p.y = 0;

				ctx!.beginPath();
				ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
				ctx!.fillStyle = 'rgba(238,241,239,0.15)';
				ctx!.fill();

				for (let j = i + 1; j < particles.length; j++) {
					const p2 = particles[j];
					const dx = p.x - p2.x;
					const dy = p.y - p2.y;
					const dist = Math.sqrt(dx * dx + dy * dy);
					if (dist >= CONNECTION_DIST) continue;
					ctx!.beginPath();
					ctx!.moveTo(p.x, p.y);
					ctx!.lineTo(p2.x, p2.y);
					ctx!.strokeStyle = `rgba(64,98,187,${(1 - dist / CONNECTION_DIST) * 0.12})`;
					ctx!.lineWidth = 0.5;
					ctx!.stroke();
				}
			}
			raf = requestAnimationFrame(draw);
		};
		raf = requestAnimationFrame(draw);

		return () => {
			window.removeEventListener('resize', resize);
			cancelAnimationFrame(raf);
		};
	}, []);

	return (
		<canvas
			ref={canvasRef}
			className={cn('pointer-events-none absolute inset-0', className)}
		/>
	);
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function AboutPage() {
	const typewriterText = useTypewriter(PHRASES);

	/* -- Stat refs -- */
	const statRefs = useRef<(HTMLSpanElement | null)[]>([]);
	const valRefs = useRef<(HTMLSpanElement | null)[]>([]);

	/* -- Timeline refs -- */
	const timelineRef = useRef<HTMLDivElement>(null);

	/* -- Glow follow -- */
	const glowRef = useRef<HTMLDivElement>(null);

	/* -- CTA form -- */
	const ctaFormRef = useRef<HTMLFormElement>(null);

	/* ---- Effects ---- */

	useEffect(() => {
		if (!glowRef.current) return;
		const glow = glowRef.current;
		const onMouse = (e: MouseEvent) => {
			const rect = glow.parentElement!.getBoundingClientRect();
			const x = ((e.clientX - rect.left) / rect.width - 0.5) * 15;
			const y = ((e.clientY - rect.top) / rect.height - 0.5) * 15;
			glow.style.transform = `translate(-50%,-50%) translate(${x}px,${y}px)`;
		};
		document.addEventListener('mousemove', onMouse);
		return () => document.removeEventListener('mousemove', onMouse);
	}, []);

	useEffect(() => {
		const tl = timelineRef.current;
		if (!tl) return;

		const items = tl.querySelectorAll('.tl-item');
		const dots = tl.querySelectorAll('.tl-dot');
		const fill = tl.querySelector('.tl-fill') as HTMLElement | null;

		const obs = new IntersectionObserver(
			(entries) => {
				for (const e of entries) {
					if (!e.isIntersecting) continue;
					items.forEach((item, i) => {
						const delay = Number(
							(item as HTMLElement).dataset.delay || 0
						);
						setTimeout(() => {
							item.classList.add('visible');
							if (dots[i]) dots[i].classList.add('filled');
						}, delay + 200);
					});
					if (fill) {
						setTimeout(() => fill.classList.add('filled'), 100);
					}
					obs.unobserve(tl);
				}
			},
			{ threshold: 0.1 }
		);
		obs.observe(tl);
		return () => obs.disconnect();
	}, []);

	useEffect(() => {
		const form = ctaFormRef.current;
		if (!form) return;
		const handler = (e: Event) => {
			e.preventDefault();
			const input = form.querySelector('input') as HTMLInputElement;
			if (input?.value) {
				window.location.href = `mailto:hello@artisanlabs.dev?subject=Artisan Labs Inquiry&body=${encodeURIComponent('From: ' + input.value + '\n\n')}`;
			}
		};
		form.addEventListener('submit', handler);
		return () => form.removeEventListener('submit', handler);
	}, []);

	/* -- Value card glitch flicker -- */
	useEffect(() => {
		const cards = document.querySelectorAll('.val-card');
		cards.forEach((card) => {
			const glitch = card.querySelector('.val-glitch') as HTMLElement;
			if (!glitch) return;
			card.addEventListener('mouseenter', () => {
				let count = 0;
				const max = 4 + Math.floor(Math.random() * 4);
				const flicker = setInterval(
					() => {
						glitch.style.opacity =
							Math.random() > 0.5 ? '0.06' : '0';
						count++;
						if (count >= max) {
							clearInterval(flicker);
							glitch.style.opacity = '0';
						}
					},
					60 + Math.random() * 100
				);
			});
		});
	}, []);

	/* -- Team avatar tilt -- */
	useEffect(() => {
		const cards = document.querySelectorAll('.team-card');
		cards.forEach((card) => {
			const svg = card.querySelector('.team-avatar svg') as SVGElement;
			if (!svg) return;
			card.addEventListener('mousemove', (e) => {
				const rect = card.getBoundingClientRect();
				const x =
					((e as MouseEvent).clientX - rect.left) / rect.width - 0.5;
				svg.style.transform = `rotate(${x * 8}deg) scale(1.1)`;
			});
			card.addEventListener('mouseleave', () => {
				svg.style.transform = 'rotate(0deg) scale(1)';
			});
		});
	}, []);

	/* -- Stat counters -- */
	useEffect(() => {
		const targets = [
			{ refs: statRefs, idx: 0, target: 2026 },
			{ refs: statRefs, idx: 1, target: 42 },
			{ refs: statRefs, idx: 2, target: 6 },
			{ refs: statRefs, idx: 3, target: 100 },
		];
		const duration = 1200;

		targets.forEach(({ refs, idx, target }) => {
			const el = refs.current[idx];
			if (!el) return;
			const obs = new IntersectionObserver(
				(entries) => {
					for (const e of entries) {
						if (!e.isIntersecting) continue;
						const start = performance.now();
						const update = (now: number) => {
							const t = Math.min((now - start) / duration, 1);
							const eased = 1 - Math.pow(1 - t, 3);
							el.textContent = String(Math.round(eased * target));
							if (t < 1) requestAnimationFrame(update);
						};
						requestAnimationFrame(update);
						obs.unobserve(el);
					}
				},
				{ threshold: 0.5 }
			);
			obs.observe(el);
		});
	}, []);

	/* -- Value counters -- */
	useEffect(() => {
		const targets = [
			{ refs: valRefs, idx: 0, target: 100, suffix: '' },
			{ refs: valRefs, idx: 1, target: 4, suffix: '' },
			{ refs: valRefs, idx: 2, target: 100, suffix: '' },
		];
		const duration = 1500;

		targets.forEach(({ refs, idx, target }) => {
			const el = refs.current[idx];
			if (!el) return;
			const obs = new IntersectionObserver(
				(entries) => {
					for (const e of entries) {
						if (!e.isIntersecting) continue;
						const start = performance.now();
						const update = (now: number) => {
							const t = Math.min((now - start) / duration, 1);
							const eased = 1 - Math.pow(1 - t, 3);
							el.textContent = String(Math.round(eased * target));
							if (t < 1) requestAnimationFrame(update);
						};
						requestAnimationFrame(update);
						obs.unobserve(el);
					}
				},
				{ threshold: 0.5 }
			);
			obs.observe(el);
		});
	}, []);

	/* -- Scroll reveals -- */
	useEffect(() => {
		const obs = new IntersectionObserver(
			(entries) => {
				for (const e of entries) {
					if (e.isIntersecting) {
						e.target.classList.add('visible');
						obs.unobserve(e.target);
					}
				}
			},
			{ threshold: 0.1 }
		);
		document.querySelectorAll('.rv').forEach((el) => obs.observe(el));
		return () => obs.disconnect();
	}, []);

	/* -- Stagger groups -- */
	useEffect(() => {
		const obs = new IntersectionObserver(
			(entries) => {
				for (const e of entries) {
					if (!e.isIntersecting) continue;
					const items = e.target.querySelectorAll('.st-item');
					items.forEach((item, i) => {
						setTimeout(
							() => item.classList.add('visible'),
							i * 120
						);
					});
					obs.unobserve(e.target);
				}
			},
			{ threshold: 0.1 }
		);
		document.querySelectorAll('.sg').forEach((g) => obs.observe(g));
		return () => obs.disconnect();
	}, []);

	return (
		<>
			{/* ============================================================ */}
			{/*  HERO                                                       */}
			{/* ============================================================ */}
			<section className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 pt-25 pb-10">
				<Particles />
				<div
					ref={glowRef}
					className="pointer-events-none absolute top-1/2 left-1/2 z-1 h-[80vmax] w-[80vmax] -translate-1/2 rounded-full"
					style={{
						background:
							'radial-gradient(circle at center,rgba(64,98,187,0.08) 0%,transparent 50%)',
					}}
				/>

				<div className="relative z-2 mx-auto w-full max-w-300">
					<p className="mb-6 flex h-6 items-center gap-2 text-[13px] tracking-[3px] text-(--accent) uppercase">
						<span className="opacity-60">{'//'}</span>
						<span>{typewriterText}</span>
						<span className="inline-block h-3.5 w-1.75 animate-[blink_0.8s_step-end_infinite] bg-(--accent) align-text-bottom" />
					</p>

					<h1 className="text-[clamp(32px,6vw,72px)] leading-[1.05] font-extrabold tracking-tighter text-(--fg)">
						Six builders.
						<br />
						<span className="text-(--accent)">One craft.</span>
						<br />
						Built different.
					</h1>

					<p className="mt-5 mb-9 max-w-160 text-[clamp(14px,1.2vw,17px)] leading-relaxed text-(--fg-60)">
						We&apos;re The Artisan Labs — a tight-knit crew of
						builders who genuinely care about the work. No bloated
						teams, no endless handoffs. Just six people who each
						know their craft inside out, working together to ship
						products that look great, run smoothly, and actually
						solve problems. Whether you need a website, a web app,
						or a mobile app, we&apos;ve got you covered from first
						line of code to launch day.
					</p>

					<div className="flex flex-wrap gap-3">
						<a
							href="#origin"
							className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-(--accent) bg-(--accent) px-6 py-3 font-mono text-[13px] font-medium text-(--fg) no-underline transition-all duration-300 hover:-translate-y-0.5 hover:bg-(--accent)/85 hover:shadow-[0_0_24px_var(--accent-20)]"
						>
							&gt; read our story
						</a>
						<a
							href="#values"
							className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-(--accent-20) bg-transparent px-6 py-3 font-mono text-[13px] font-medium text-(--fg-60) no-underline transition-all duration-300 hover:-translate-y-0.5 hover:border-(--accent) hover:text-(--fg)"
						>
							our principles &rarr;
						</a>
					</div>

					<div className="mt-12 flex gap-10 border-t border-(--border) pt-8">
						{[
							{ target: 2026, label: 'Established' },
							{ target: 42, label: 'Projects shipped' },
							{ target: 6, label: 'Team members' },
							{ target: 100, label: '% Monospace' },
						].map((s, i) => (
							<div
								key={s.label}
								className="flex flex-col gap-0.5"
							>
								<span
									ref={(el) => {
										statRefs.current[i] = el;
									}}
									className="text-[clamp(20px,2vw,28px)] font-bold text-(--fg) tabular-nums"
								>
									0
								</span>
								<span className="text-[11px] tracking-[2px] text-(--fg-40) uppercase">
									{s.label}
								</span>
							</div>
						))}
					</div>
				</div>

				<div className="absolute bottom-6 left-1/2 z-2 flex -translate-x-1/2 flex-col items-center gap-1.5">
					<span className="text-[10px] tracking-[2px] text-(--fg-20)">
						SCROLL
					</span>
					<div className="relative h-10 w-0.75 overflow-hidden bg-(--accent-40)">
						<div className="absolute inset-0 animate-[scrollPulse_2s_ease-in-out_infinite] bg-(--accent)" />
					</div>
				</div>
			</section>

			{/* ============================================================ */}
			{/*  ORIGIN / TIMELINE                                           */}
			{/* ============================================================ */}
			<section id="origin" className="py-30 md:py-20">
				<div className="mx-auto max-w-300 px-6">
					<div className="rv translate-y-7.5 opacity-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] [&.visible]:translate-y-0 [&.visible]:opacity-100">
						<span className="mb-4 block text-[13px] tracking-[3px] text-(--accent) uppercase">
							origin
						</span>
					</div>
					<h2 className="rv mb-12 translate-y-7.5 text-[clamp(28px,3.5vw,42px)] leading-tight font-bold tracking-tight text-(--fg) opacity-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] [&.visible]:translate-y-0 [&.visible]:opacity-100">
						How we work.
					</h2>

					<div ref={timelineRef} className="relative pl-10">
						<div className="tl-fill absolute top-0 left-1.5 h-0 w-0.75 bg-(--accent) transition-all duration-1200 ease-[cubic-bezier(0.16,1,0.3,1)] [&.filled]:h-full" />
						<div className="absolute top-0 left-1.5 h-full w-0.75 bg-(--border)" />

						{TIMELINE.map((item) => (
							<div
								key={item.title}
								className="tl-item relative mb-12 -translate-x-3 pl-7 opacity-0 transition-all duration-600 ease-out last:mb-0 [&.visible]:translate-x-0 [&.visible]:opacity-100"
								data-delay={item.delay}
							>
								<div className="tl-dot absolute top-1.5 -left-10 z-2 h-3.25 w-3.25 rounded-full border-2 border-(--accent) bg-(--bg) transition-all duration-300 [&.filled]:bg-(--accent) [&.filled]:shadow-[0_0_10px_rgba(64,98,187,0.4)]" />
								<p className="mb-1 flex items-center gap-2 text-[11px] tracking-[2px] text-(--accent)">
									<span>{item.date}</span>
									<span className="text-[10px] text-(--fg-20)">
										{item.log}
									</span>
								</p>
								<h3 className="mb-1.5 text-base font-bold text-(--fg)">
									{item.title}
								</h3>
								<p className="max-w-150 text-[13px] leading-relaxed text-(--fg-60)">
									{item.desc}
								</p>
								<div className="mt-2.5 flex flex-wrap gap-1.5">
									{item.tags.map((t) => (
										<span
											key={t}
											className="rounded-[3px] border border-(--accent-20) px-2 py-0.5 text-[10px] text-(--fg-40)"
										>
											{t}
										</span>
									))}
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* ============================================================ */}
			{/*  VALUES                                                      */}
			{/* ============================================================ */}
			<section
				id="values"
				className="border-t border-(--border) py-30 md:py-20"
			>
				<div className="mx-auto max-w-300 px-6">
					<div className="rv translate-y-7.5 opacity-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] [&.visible]:translate-y-0 [&.visible]:opacity-100">
						<span className="mb-4 block text-[13px] tracking-[3px] text-(--accent) uppercase">
							principles
						</span>
					</div>
					<h2 className="rv mb-12 translate-y-7.5 text-[clamp(28px,3.5vw,42px)] leading-tight font-bold tracking-tight text-(--fg) opacity-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] [&.visible]:translate-y-0 [&.visible]:opacity-100">
						The constraints that free us.
					</h2>

					<div className="sg grid gap-5 md:grid-cols-3">
						{VALUES.map((v, i) => (
							<div
								key={v.name}
								className="val-card st-item relative translate-y-5 overflow-hidden rounded-xl border border-(--accent-10) bg-(--bg) p-7 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.75 hover:border-(--accent-40)"
							>
								<div
									className="val-glitch pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200"
									style={{
										background: v.glitch,
									}}
								/>
								<div className="val-card:hover:scale-x-100 absolute top-0 right-0 left-0 h-0.5 origin-left scale-x-0 bg-(--accent) transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
								<span className="mb-2.5 block text-[11px] tracking-[2px] text-(--accent)">
									{v.num}
								</span>
								<span className="mb-4 block text-lg font-bold text-(--accent)">
									{v.icon}
								</span>
								<h3 className="mb-2 text-[17px] font-bold text-(--fg)">
									{v.name}
								</h3>
								<p className="mb-4 text-[13px] leading-relaxed text-(--fg-60)">
									{v.desc}
								</p>
								<div className="text-[20px] font-bold text-(--accent) tabular-nums">
									<span
										ref={(el) => {
											valRefs.current[i] = el;
										}}
									>
										0
									</span>
									{v.stat}
								</div>
								<div className="mt-0.5 text-[10px] tracking-[1.5px] text-(--fg-40) uppercase">
									{v.label}
								</div>
							</div>
						))}
					</div>

					{/* -- Samples -- */}
					<div className="rv mt-18 translate-y-7.5 opacity-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] [&.visible]:translate-y-0 [&.visible]:opacity-100">
						<span className="mb-4 block text-[13px] tracking-[3px] text-(--accent) uppercase">
							samples
						</span>
						<h3 className="mb-7 text-[clamp(20px,2.2vw,28px)] font-bold text-(--fg)">
							What we&apos;ve shipped.
						</h3>
					</div>

					<div className="sg grid gap-5 md:grid-cols-3">
						{SAMPLES.map((s) => (
							<div
								key={s.name}
								className="st-item translate-y-5 overflow-hidden rounded-xl border border-(--accent-10) bg-(--bg) opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.75 hover:border-(--accent-40) [&.visible]:translate-y-0 [&.visible]:opacity-100"
							>
								<div className="flex h-35 items-center justify-center overflow-hidden border-b border-(--accent-10) bg-(--accent-05)">
									{s.type === 'grid' && (
										<div className="grid h-full w-full grid-cols-3 gap-1 p-4">
											{[...Array(9)].map((_, i) => (
												<span
													key={i}
													className="rounded-[3px] bg-(--accent-10) transition-all duration-400"
												/>
											))}
										</div>
									)}
									{s.type === 'bars' && (
										<div className="flex w-full flex-col gap-0.75 p-6">
											{[75, 50, 60].map((w, i) => (
												<div
													key={i}
													className="h-1.5 rounded-[3px] bg-(--accent-10) transition-all duration-600"
													style={{ width: `${w}%` }}
												/>
											))}
										</div>
									)}
									{s.type === 'chart' && (
										<svg
											className="h-full w-full p-2"
											viewBox="0 0 240 140"
											fill="none"
										>
											<rect
												x="1"
												y="1"
												width="238"
												height="138"
												rx="6"
												stroke="var(--accent-20)"
												strokeWidth="1"
											/>
											<path
												d="M20 100 L60 60 L100 80 L140 40 L180 70 L220 50"
												stroke="var(--accent-60)"
												strokeWidth="1.5"
											/>
											<circle
												cx="60"
												cy="60"
												r="3"
												fill="var(--accent)"
											/>
											<circle
												cx="100"
												cy="80"
												r="3"
												fill="var(--accent)"
											/>
											<circle
												cx="140"
												cy="40"
												r="3"
												fill="var(--accent)"
											/>
											<circle
												cx="180"
												cy="70"
												r="3"
												fill="var(--accent)"
											/>
											<circle
												cx="220"
												cy="50"
												r="3"
												fill="var(--accent)"
											/>
											<text
												x="20"
												y="125"
												fill="var(--fg-20)"
												fontSize="9"
											>
												q1 · 2025
											</text>
											<text
												x="185"
												y="125"
												fill="var(--fg-20)"
												fontSize="9"
											>
												q4 · 2025
											</text>
										</svg>
									)}
								</div>
								<div className="p-5">
									<div className="mb-2 flex flex-wrap gap-1">
										{s.tags.map((t) => (
											<span
												key={t}
												className="rounded-[3px] border border-(--accent-20) px-2 py-0.5 text-[9px] tracking-[1.5px] text-(--accent) uppercase"
											>
												{t}
											</span>
										))}
									</div>
									<h4 className="mb-1 text-[14px] font-bold text-(--fg)">
										{s.name}
									</h4>
									<p className="text-[12px] leading-relaxed text-(--fg-60)">
										{s.desc}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* ============================================================ */}
			{/*  TEAM                                                        */}
			{/* ============================================================ */}
			<section
				id="team"
				className="border-t border-(--border) py-30 md:py-20"
			>
				<div className="mx-auto max-w-300 px-6">
					<div className="rv translate-y-7.5 opacity-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] [&.visible]:translate-y-0 [&.visible]:opacity-100">
						<span className="mb-4 block text-[13px] tracking-[3px] text-(--accent) uppercase">
							team
						</span>
					</div>
					<h2 className="rv mb-12 translate-y-7.5 text-[clamp(28px,3.5vw,42px)] leading-tight font-bold tracking-tight text-(--fg) opacity-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] [&.visible]:translate-y-0 [&.visible]:opacity-100">
						The six of us.
					</h2>

					<div className="sg grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
						{TEAM.map((m) => (
							<div
								key={m.name}
								className="team-card st-item relative translate-y-5 overflow-hidden rounded-xl border border-(--accent-10) bg-(--bg) px-5 pt-7 pb-5 text-center opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-(--accent-40) [&.visible]:translate-y-0 [&.visible]:opacity-100"
							>
								<div className="team-avatar mx-auto mb-4 flex h-25 w-25 items-center justify-center overflow-hidden rounded-full border border-(--accent-20) transition-all duration-400">
									<svg
										viewBox="0 0 60 60"
										fill="none"
										stroke="var(--accent-40)"
										strokeWidth="1.5"
										className="h-15 w-15 transition-all duration-500 ease-out"
									>
										{m.svg}
										{m.inner && (
											<g stroke="var(--accent-60)">
												{m.inner}
											</g>
										)}
										{m.path && (
											<g stroke="var(--accent-40)">
												{m.path}
											</g>
										)}
									</svg>
								</div>
								<h3 className="mb-0.5 text-[14px] font-bold text-(--fg)">
									{m.name}
								</h3>
								<p className="mb-2 text-[11px] tracking-[1px] text-(--accent) uppercase">
									{m.role}
								</p>
								<p className="team-card:hover:max-h-30 team-card:hover:opacity-100 max-h-0 overflow-hidden text-[12px] leading-relaxed text-(--fg-60) opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
									{m.bio}
								</p>
								<div className="mt-2.5 flex flex-wrap justify-center gap-1">
									{m.tags.map((t) => (
										<span
											key={t}
											className="rounded-[3px] border border-(--accent-10) px-2 py-0.5 text-[9px] text-(--fg-40)"
										>
											{t}
										</span>
									))}
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* ============================================================ */}
			{/*  CTA                                                         */}
			{/* ============================================================ */}
			<section className="border-t border-(--border) px-6 py-30 text-center md:py-20">
				<div className="rv translate-y-7.5 opacity-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] [&.visible]:translate-y-0 [&.visible]:opacity-100">
					<span className="mb-4 inline-flex text-[13px] tracking-[3px] text-(--accent) uppercase">
						contact
					</span>
					<h2 className="text-[clamp(22px,3vw,36px)] leading-tight font-bold tracking-tight text-(--fg)">
						Got a project in mind?
					</h2>
					<p className="mb-8 text-[14px] text-(--fg-60)">
						Drop us a line — no bloated proposals, no sales pitch.
						Just good work.
					</p>
					<form
						ref={ctaFormRef}
						className="mx-auto mb-7 inline-flex w-full max-w-120 items-center gap-0 rounded-lg border border-(--border) bg-(--bg) p-1"
					>
						<span className="px-3 text-[13px] font-bold text-(--accent) select-none">
							$
						</span>
						<input
							type="email"
							placeholder="your@email.com"
							required
							className="flex-1 bg-transparent px-0 py-2.5 font-mono text-[13px] text-(--fg) outline-none placeholder:text-(--fg-20)"
						/>
						<button
							type="submit"
							className="cursor-pointer rounded-sm border-none bg-(--accent) px-4 py-2 font-mono text-[12px] font-medium text-(--fg) transition-all duration-300 hover:bg-(--accent)/80"
						>
							send &rarr;
						</button>
					</form>
					<div className="flex justify-center gap-3">
						{['GH', 'LI', 'X', 'DB'].map((l) => (
							<a
								key={l}
								href="#"
								className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border border-(--fg-10) text-[11px] font-medium text-(--fg-40) transition-all duration-300 hover:border-(--accent) hover:bg-(--accent-10) hover:text-(--accent)"
								aria-label={l}
							>
								{l}
							</a>
						))}
					</div>
				</div>
			</section>

			{/* ============================================================ */}
			{/*  FOOTER                                                      */}
			{/* ============================================================ */}
			<footer className="border-t border-(--border) px-6 py-8 text-center text-[11px] text-(--fg-40)">
				<p>
					<span className="font-bold text-(--accent)">&gt;</span>
					&copy; 2026 Artisan Labs &bull; built with intent &bull;
					<a
						href="mailto:hello@artisanlabs.dev"
						className="ml-1 cursor-pointer text-(--fg-40) transition-colors duration-300 hover:text-(--accent)"
					>
						hello@artisanlabs.dev
					</a>
				</p>
			</footer>
		</>
	);
}
