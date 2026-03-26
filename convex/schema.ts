import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
  events: defineTable({
    code: v.string(),
    name: v.string(),
    description: v.string(),
    is_open: v.boolean(),
    is_archived: v.boolean(),
    location: v.string(),
    event_date: v.string(),
    creator_id: v.string(),
    flier_url: v.optional(v.string()),
  }).index("by_creatorId", ["creator_id"]),
  attendess: defineTable({
    event_id: v.string(),
    name: v.string(),
    linkedin_url: v.string(),
    is_vip: v.optional(v.boolean()),
    interests: v.optional(v.array(v.string())),
  }),
})
