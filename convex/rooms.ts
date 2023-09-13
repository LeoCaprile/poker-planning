import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const get = query({
  args: { id: v.id("rooms") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const getUsers = query({
  args: { id: v.id("rooms") },
  handler: async (ctx, args) => {
    const room = await ctx.db.get(args.id);
    if (room.users.length === 0) {
      return [];
    }

    return Promise.all(
      room.users.map(async (userId: Id<"user">) => await ctx.db.get(userId))
    );
  },
});
export const create = mutation({
  args: {},
  handler: async (ctx) => {
    const roomId = await ctx.db.insert("rooms", { users: [] });
    return roomId;
  },
});
