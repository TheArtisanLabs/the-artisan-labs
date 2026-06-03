/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as faq from "../faq.js";
import type * as phrases from "../phrases.js";
import type * as portfolio from "../portfolio.js";
import type * as process from "../process.js";
import type * as services from "../services.js";
import type * as stack from "../stack.js";
import type * as team from "../team.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  faq: typeof faq;
  phrases: typeof phrases;
  portfolio: typeof portfolio;
  process: typeof process;
  services: typeof services;
  stack: typeof stack;
  team: typeof team;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
