import { query, mutation } from './_generated/server';

const DEFAULT_STACK = [
	'React',
	'Next.js',
	'Laravel',
	'TypeScript',
	'Flutter',
	'Node',
	'Figma',
	'React Native',
	'Python',
	'PostgreSQL',
	'Tailwind',
].map((name, i) => ({ name, order: i }));

export const getAll = query({
	args: {},
	handler: async (ctx) => {
		return await ctx.db
			.query('stack')
			.withIndex('by_order')
			.collect();
	},
});

export const seed = mutation({
	args: {},
	handler: async (ctx) => {
		const existing = await ctx.db.query('stack').first();
		if (existing) return { seeded: false, count: 0 };

		for (const tech of DEFAULT_STACK) {
			await ctx.db.insert('stack', tech);
		}

		const count = (await ctx.db.query('stack').collect()).length;
		return { seeded: true, count };
	},
});
