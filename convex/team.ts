import { query, mutation } from './_generated/server';

const DEFAULT_MEMBERS = [
	{
		initials: 'JD',
		name: 'Jules Desmarais',
		role: 'Founder & Lead Developer',
		bio: 'Full-stack engineer with a design sensibility. 15 years building for startups and enterprises. Rust, React, and systems thinking.',
		order: 0,
	},
	{
		initials: 'AN',
		name: 'Aiko Nakamura',
		role: 'Mobile & Frontend Lead',
		bio: 'Flutter and Swift specialist who obsesses over animation curves and gesture handling. Previously at a top-50 App Store publisher.',
		order: 1,
	},
	{
		initials: 'TR',
		name: 'Tom\u00e1s Reyes',
		role: 'Backend & Infrastructure',
		bio: 'Distributed systems, databases, and DevOps. Keeps the production stack boring and reliable so the fun stuff works at scale.',
		order: 2,
	},
	{
		initials: 'EL',
		name: 'Elena Larsson',
		role: 'Product Designer',
		bio: 'Design systems, interaction design, and user research. Bridges the gap between what stakeholders ask for and what users actually need.',
		order: 3,
	},
];

export const getAll = query({
	args: {},
	handler: async (ctx) => {
		return await ctx.db
			.query('team')
			.withIndex('by_order')
			.collect();
	},
});

export const seed = mutation({
	args: {},
	handler: async (ctx) => {
		const existing = await ctx.db.query('team').first();
		if (existing) return { seeded: false, count: 0 };

		for (const member of DEFAULT_MEMBERS) {
			await ctx.db.insert('team', member);
		}

		const count = (await ctx.db.query('team').collect()).length;
		return { seeded: true, count };
	},
});
