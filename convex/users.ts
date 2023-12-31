import { v } from "convex/values";
import { httpAction, mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";
import { api } from "./_generated/api";
import { UserState } from "@/modules/User/types";

export const get = query({
  args: { id: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const create = mutation({
  args: {
    roomId: v.id("rooms"),
    name: v.string(),
    role: v.union(v.literal("dev"), v.literal("viewer"), v.literal("po")),
    state: v.union(v.literal("idle"), v.literal("ready"), v.literal("coffee")),
  },
  handler: async (ctx, { name, role, state, roomId }) => {
    const userId = await ctx.db.insert("users", { name, role, state, vote: 0 });
    const room = await ctx.db.get(roomId);
    await ctx.db.patch(roomId, { users: [...(room?.users ?? []), userId] });
    return userId;
  },
});

export const vote = mutation({
  args: {
    id: v.id("users"),
    vote: v.number(),
  },
  handler: async (ctx, { id, vote }) => {
    await ctx.db.patch(id, { vote, state: UserState.ready });
  },
});

export const remove = mutation({
  args: { id: v.id("users"), roomId: v.id("rooms") },
  handler: async (ctx, { id, roomId }) => {
    const room = await ctx.db.get(roomId);
    console.log(room);
    console.log(id);
    await ctx.db.patch(roomId, {
      users: room.users.filter((userId: Id<"users">) => userId !== id),
    });
    await ctx.db.delete(id);
  },
});

export const removeUserHttp = httpAction(async (ctx, req) => {
  const { id, roomId } = await req.json();

  await ctx.runMutation(api.users.remove, { id, roomId });

  return new Response(null, {
    status: 200,
  });
});
