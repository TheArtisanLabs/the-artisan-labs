import { query, mutation } from './_generated/server';

const DEFAULT_FAQS = [
	{
		q: 'How much does a typical project cost?',
		a: "It depends on scope and complexity. Most projects fall between $20K\u2013$80K. We'll give you a fixed-price or time-and-materials quote after a brief discovery call \u2014 no commitment, no sales pitch.",
		order: 0,
	},
	{
		q: 'How long does it take to build an app?',
		a: 'A typical MVP takes 8\u201312 weeks. A full-featured product is usually 4\u20136 months. We work in two-week sprints with demos at the end of each so you can track progress and course-correct early.',
		order: 1,
	},
	{
		q: 'Do you work with early-stage startups?',
		a: 'Yes \u2014 about half our clients are pre-seed or seed-stage. We can structure payment terms and scope to match your runway. We also offer technical co-founder services for teams that need architectural leadership.',
		order: 2,
	},
	{
		q: 'What happens after launch?',
		a: "We offer ongoing maintenance, monitoring, and feature development retainers. You're never left with orphaned code \u2014 we document everything and can transition to your internal team when you're ready.",
		order: 3,
	},
	{
		q: 'Do you sign NDAs?',
		a: "Always. We work with sensitive product ideas regularly. Your concept is yours \u2014 we're here to build it, not shop it around.",
		order: 4,
	},
];

export const getAll = query({
	args: {},
	handler: async (ctx) => {
		return await ctx.db.query('faq').withIndex('by_order').collect();
	},
});

export const seed = mutation({
	args: {},
	handler: async (ctx) => {
		const existing = await ctx.db.query('faq').first();
		if (existing) return { seeded: false, count: 0 };

		for (const faq of DEFAULT_FAQS) {
			await ctx.db.insert('faq', faq);
		}

		const count = (await ctx.db.query('faq').collect()).length;
		return { seeded: true, count };
	},
});
