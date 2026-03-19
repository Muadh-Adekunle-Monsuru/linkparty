import { mutation, query } from "./_generated/server"
import { v } from "convex/values"

export const createEventFunction = mutation({
  // Validators for arguments.
  args: {
    name: v.string(),
    description: v.string(),
    is_open: v.boolean(),
    is_archived: v.boolean(),
    location: v.string(),
    event_date: v.string(),
    creator_id: v.string(),
    code: v.string(),
    flier_url: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("events", { ...args })
  },
})

export const getAdminEvents = query({
  args: {
    creator_id: v.string(),
  },
  handler: async (ctx, args) => {
    const documents = await ctx.db
      .query("events")
      .withIndex("by_creatorId", (q) => q.eq("creator_id", args.creator_id))
      .collect()
    return documents
  },
})
