import { mutation } from "./_generated/server"
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
