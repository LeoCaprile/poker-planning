import Card from "@/components/Atoms/Card";
import VoteCard from "@/components/Atoms/VoteCard";
import React, { use, useState } from "react";
import { api } from "../../../../convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { Id } from "../../../../convex/_generated/dataModel";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

type Props = {
  id: Id<"users">;
};

const DevControls = ({ id }: Props) => {
  const router = useRouter();
  const { id: roomId } = router.query as { id: Id<"rooms"> };
  const room = useQuery(api.rooms.get, { id: roomId });
  const user = useQuery(api.users.get, { id });
  const vote = useMutation(api.users.vote).withOptimisticUpdate(
    (localStore, args) => {
      const { id, vote } = args;
      const user = localStore.getQuery(api.users.get, { id });
      if (user !== undefined) {
        localStore.setQuery(api.users.get, { id }, { ...user, vote });
      }
    }
  );

  async function onVote(value: number) {
    try {
      await vote({ id, vote: value });
    } catch (e) {
      toast.error("Error submitting your vote, try again");
    }
  }

  return (
    <Card title="Choose your estimation">
      <div className="flex justify-between mt-5 text-black font-medium">
        {room &&
          room?.votesValues?.map((value: string | number) => (
            <VoteCard
              key={value}
              value={value}
              selected={user?.vote === value}
              onClick={(e) => onVote(Number(e.currentTarget.value))}
            />
          ))}
      </div>
    </Card>
  );
};

export default DevControls;
