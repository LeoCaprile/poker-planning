import { v } from "convex/values";
import {
  action,
  internalMutation,
  internalQuery,
  mutation,
  query,
} from "./_generated/server";
import { Id } from "./_generated/dataModel";
import { internal } from "./_generated/api";
import { checkIfDateIsOneMonthOld } from "../utils";
import { UserRoles, UserState } from "@/modules/User/types";

export const get = query({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    try {
      return await ctx.db.get(args.id as Id<"rooms">);
    } catch {
      return null;
    }
  },
});

export const showCards = mutation({
  args: { id: v.id("rooms") },
  handler: async (ctx, args) => {
    const room = await ctx.db.get(args.id);

    const users = await Promise.all(
      room?.users.map(
        async (userId: Id<"users">) => await ctx.db.get(userId)
      ) ?? []
    );

    if (!room?.showVotes && users?.length > 0) {
      const dict: Record<number, Array<string>> = {};
      const usersWithVotes = users?.filter(
        (user) => user?.vote !== 0 && user.role === UserRoles.dev
      );
      const votes = usersWithVotes?.map((user) => ({
        vote: user.vote,
        id: user._id,
      }));

      // check if theres no equal votes
      const votesCount = votes?.map((vote) => vote.vote);

      // logic to separate users by their vote
      for (let i = 0; i < votes.length; i++) {
        if (dict[votes[i].vote]) {
          dict[votes[i].vote].push(votes[i].id);
        } else {
          dict[votes[i].vote] = [votes[i].id];
        }
      }

      // Sort the votes by how much users voted for specific value
      const sortedVotes = Object.entries(dict).sort((a, b) => {
        // if theres even votes return the highest value
        if (a[1].length === b[1].length) {
          return Number(b[0]) - Number(a[0]);
        }
        // if theres uneven votes return the value with less votes
        return a[1].length - b[1].length;
      });

      // if theres less than 2 unequal votes
      if (votesCount.length > 1 && sortedVotes.length > 1) {
        const usersSelectedToJustify = sortedVotes[0][1];
        usersSelectedToJustify.forEach(async (userId: Id<"users">) => {
          await ctx.db.patch(userId, { justifyVote: true });
        });
      }
    } else {
      users?.forEach(async (user) => {
        await ctx.db.patch(user._id, { justifyVote: false });
      });
    }

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
          await ctx.db.patch(userId, {
            vote: 0,
            state: UserState.idle,
            justifyVote: false,
          })
      ) ?? [],
      ctx.db.patch(args.id, { showVotes: false }),
    ]);
  },
});

export const getOldRooms = internalQuery({
  handler: async (ctx) => {
    const rooms = await ctx.db.query("rooms").collect();
    return rooms.filter((room) => checkIfDateIsOneMonthOld(room._creationTime));
  },
});

export const deleteOldRooms = internalMutation({
  args: { rooms: v.array(v.id("rooms")) },
  handler: async (ctx, args) => {
    args.rooms.forEach((id: Id<"rooms">) => {
      ctx.db.delete(id);
    });
  },
});

export const deleteIdleRooms = action({
  handler: async (ctx) => {
    const rooms = await ctx.runQuery(internal.rooms.getOldRooms);
    if (rooms.length > 0) {
      await ctx.runMutation(internal.rooms.deleteOldRooms, {
        rooms: rooms.map((room) => room._id),
      });
    }
  },
});
