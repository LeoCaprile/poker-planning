import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  rooms: defineTable({
    showVotes: v.boolean(),
    users: v.array(v.id("users")),
    votesValues: v.optional(v.array(v.float64())),
    showConfetti: v.optional(v.boolean()),
  }),
  users: defineTable({
    name: v.string(),
    role: v.string(),
    state: v.string(),
    vote: v.float64(),
    justifyVote: v.optional(v.boolean()),
  }),
});
