import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
	services: defineTable({
		num: v.string(),
		name: v.string(),
		desc: v.string(),
		order: v.number(),
	}).index('by_order', ['order']),
	portfolio: defineTable({
		name: v.string(),
		thumb: v.string(),
		tags: v.array(v.string()),
		tall: v.boolean(),
		full: v.boolean(),
		bg: v.string(),
		order: v.number(),
	}).index('by_order', ['order']),
	stack: defineTable({
		name: v.string(),
		order: v.number(),
	}).index('by_order', ['order']),
	phrases: defineTable({
		text: v.string(),
		order: v.number(),
	}).index('by_order', ['order']),
	process: defineTable({
		num: v.string(),
		icon: v.string(),
		name: v.string(),
		desc: v.string(),
		order: v.number(),
	}).index('by_order', ['order']),
	team: defineTable({
		initials: v.string(),
		name: v.string(),
		role: v.string(),
		bio: v.string(),
		order: v.number(),
	}).index('by_order', ['order']),
	faq: defineTable({
		q: v.string(),
		a: v.string(),
		order: v.number(),
	}).index('by_order', ['order']),
});
