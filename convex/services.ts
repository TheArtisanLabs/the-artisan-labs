import { query, mutation } from './_generated/server';

const DEFAULT_SERVICES = [
	{
		num: '[ 01 ]',
		name: 'Web Apps',
		desc: 'Full-stack applications built to scale. From SPAs to server-rendered platforms, we ship production-grade frontends and backends.',
		order: 0,
	},
	{
		num: '[ 02 ]',
		name: 'Mobile Apps',
		desc: 'Cross-platform and native mobile experiences. Flutter, Swift, Kotlin — whatever fits the problem, not the resume.',
		order: 1,
	},
	{
		num: '[ 03 ]',
		name: 'UI/UX Design',
		desc: 'Interaction design that respects the user. Prototypes, design systems, micro-animations, and interfaces that feel considered.',
		order: 2,
	},
	{
		num: '[ 04 ]',
		name: 'Custom Software',
		desc: "One-off tools, internal platforms, automation pipelines. If it doesn't exist yet, we'll build it.",
		order: 3,
	},
];

export const getAll = query({
	args: {},
	handler: async (ctx) => {
		return await ctx.db
			.query('services')
			.withIndex('by_order')
			.collect();
	},
});

export const seed = mutation({
	args: {},
	handler: async (ctx) => {
		const existing = await ctx.db.query('services').first();
		if (existing) return { seeded: false, count: 0 };

		for (const service of DEFAULT_SERVICES) {
			await ctx.db.insert('services', service);
		}

		const count = (await ctx.db.query('services').collect()).length;
		return { seeded: true, count };
	},
});
