import EstimationCard from "@/modules/Room/EstimationTable/EstimationCard";
import { useQuery } from "convex/react";
import React from "react";
import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";
import { useRouter } from "next/router";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const EstimationTable = () => {
  const router = useRouter();
  const { id } = router.query as { id: Id<"rooms"> };
  const room = useQuery(api.rooms.get, { id });
  const users = useQuery(api.rooms.getUsers, { id });
  const [parent] = useAutoAnimate();

  return (
    <ul
      ref={parent}
      className="grid grid-cols-2 mt-20 md:mt-0 md:grid-cols-4 md:grid-rows-2 gap-5"
    >
      {users?.map((user) => {
        if (user?.vote === 0) return;
        if (typeof user !== undefined || typeof user !== null) {
          return (
            <EstimationCard
              key={user?._id}
              name={user.name}
              show={room.showVotes}
              value={user.vote}
            />
          );
        }
        return;
      })}
    </ul>
  );
};

export default EstimationTable;
