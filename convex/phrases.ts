import { query, mutation } from './_generated/server';

const DEFAULT_PHRASES = [
	'crafting web experiences',
	'shipping mobile products',
	'designing with intent',
	'building custom software',
].map((text, i) => ({ text, order: i }));

export const getAll = query({
	args: {},
	handler: async (ctx) => {
		return await ctx.db
			.query('phrases')
			.withIndex('by_order')
			.collect();
	},
});

export const seed = mutation({
	args: {},
	handler: async (ctx) => {
		const existing = await ctx.db.query('phrases').first();
		if (existing) return { seeded: false, count: 0 };

		for (const phrase of DEFAULT_PHRASES) {
			await ctx.db.insert('phrases', phrase);
		}

		const count = (await ctx.db.query('phrases').collect()).length;
		return { seeded: true, count };
	},
});
