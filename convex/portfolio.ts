import { query, mutation } from './_generated/server';

const DEFAULT_PORTFOLIO = [
	{
		name: 'Project Foundry',
		thumb: 'PF',
		tags: ['React', 'Node', 'PostgreSQL'],
		tall: true,
		full: false,
		bg: '#252E2B',
		order: 0,
	},
	{
		name: 'Sylva',
		thumb: 'SV',
		tags: ['Flutter', 'Firebase'],
		tall: false,
		full: false,
		bg: '#232D2F',
		order: 1,
	},
	{
		name: 'Deck Chair',
		thumb: 'DC',
		tags: ['Next.js', 'TypeScript', 'Tailwind'],
		tall: false,
		full: true,
		bg: '#22302C',
		order: 2,
	},
];

export const getAll = query({
	args: {},
	handler: async (ctx) => {
		return await ctx.db
			.query('portfolio')
			.withIndex('by_order')
			.collect();
	},
});

export const seed = mutation({
	args: {},
	handler: async (ctx) => {
		const existing = await ctx.db.query('portfolio').first();
		if (existing) return { seeded: false, count: 0 };

		for (const project of DEFAULT_PORTFOLIO) {
			await ctx.db.insert('portfolio', project);
		}

		const count = (await ctx.db.query('portfolio').collect()).length;
		return { seeded: true, count };
	},
});
