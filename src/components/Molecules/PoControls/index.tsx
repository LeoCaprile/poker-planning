import Card from "@/components/Atoms/Card";
import { useMutation, useQuery } from "convex/react";
import React from "react";
import { api } from "../../../../convex/_generated/api";
import { useRouter } from "next/router";
import { Id } from "../../../../convex/_generated/dataModel";

const PoControls = () => {
  const router = useRouter();
  const { id } = router.query as { id: Id<"rooms"> };

  const showCards = useMutation(api.rooms.showCards);
  const resetVotes = useMutation(api.rooms.resetVotes);
  const room = useQuery(api.rooms.get, { id });
  const users = useQuery(api.rooms.getUsers, { id });

  const usersHasVoted = !users?.some((user) => user?.vote !== 0);

  async function onShowCards() {
    await showCards({ id });
  }

  async function onResetVotes() {
    await resetVotes({ id });
  }

  return (
    <Card title="Control the session">
      <div className="flex flex-col md:flex-row gap-5">
        <div
          className={usersHasVoted && "tooltip"}
          data-tip="At least one user has to vote"
        >
          <button
            disabled={usersHasVoted}
            onClick={onShowCards}
            className="btn btn-lg btn-primary w-full"
          >
            {room?.showVotes ? "Reset" : "Show Cards"}
          </button>
        </div>
        <button onClick={onResetVotes} className="btn btn-lg btn-primary">
          Next estimation
        </button>
      </div>
    </Card>
  );
};

export default PoControls;
