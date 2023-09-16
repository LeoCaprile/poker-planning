import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const get = query({
  args: { id: v.id("rooms") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const showCards = mutation({
  args: { id: v.id("rooms") },
  handler: async (ctx, args) => {
    const room = await ctx.db.get(args.id);
    await ctx.db.patch(args.id, { showVotes: !room?.showVotes });
  },
});

export const getUsers = query({
  args: { id: v.id("rooms") },
  handler: async (ctx, args) => {
    const room = await ctx.db.get(args.id);
    if (room?.users.length === 0) {
      return [];
    }

    return Promise.all(
      room?.users.map(
        async (userId: Id<"users">) => await ctx.db.get(userId)
      ) ?? []
    );
  },
});

export const create = mutation({
  args: {},
  handler: async (ctx) => {
    const roomId = await ctx.db.insert("rooms", {
      users: [],
      showVotes: false,
      votesValues: [1, 2, 3, 5, 8],
    });
    return roomId;
  },
});

export const resetVotes = mutation({
  args: { id: v.id("rooms") },
  handler: async (ctx, args) => {
    const room = await ctx.db.get(args.id);

    Promise.all([
      room?.users.map(
        async (userId: Id<"users">) =>
          await ctx.db.patch(userId, { vote: 0, state: "idle" })
      ) ?? [],
      ctx.db.patch(args.id, { showVotes: false }),
    ]);
  },
});
