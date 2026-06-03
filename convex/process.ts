import { query, mutation } from './_generated/server';

const DEFAULT_STEPS = [
	{
		num: '[01]',
		icon: '\u2615',
		name: 'Discover',
		desc: "We learn your domain, your users, and your constraints. No assumptions \u2014 just research, interviews, and a shared understanding of what success looks like.",
		order: 0,
	},
	{
		num: '[02]',
		icon: '\u25C6',
		name: 'Design',
		desc: "Interactive prototypes, not static mockups. We validate flows and interactions before writing a line of production code. You see it working before we build it.",
		order: 1,
	},
	{
		num: '[03]',
		icon: '\u2699',
		name: 'Build',
		desc: "Clean architecture, thorough tests, daily builds. We ship incrementally so you can touch working software at every stage \u2014 no black boxes, no surprise rewrites.",
		order: 2,
	},
	{
		num: '[04]',
		icon: '\u25B2',
		name: 'Launch & grow',
		desc: "Deployment, monitoring, and post-launch support. We stay with you after go-live to handle edge cases, iterate on feedback, and keep the product healthy.",
		order: 3,
	},
];

export const getAll = query({
	args: {},
	handler: async (ctx) => {
		return await ctx.db
			.query('process')
			.withIndex('by_order')
			.collect();
	},
});

export const seed = mutation({
	args: {},
	handler: async (ctx) => {
		const existing = await ctx.db.query('process').first();
		if (existing) return { seeded: false, count: 0 };

		for (const step of DEFAULT_STEPS) {
			await ctx.db.insert('process', step);
		}

		const count = (await ctx.db.query('process').collect()).length;
		return { seeded: true, count };
	},
});
