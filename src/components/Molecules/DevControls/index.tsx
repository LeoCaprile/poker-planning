import Card from "@/components/Atoms/Card";
import VoteCard from "@/components/Atoms/VoteCard";
import React, { use, useState } from "react";
import { api } from "../../../../convex/_generated/api";
import { useMutation } from "convex/react";
import { Id } from "../../../../convex/_generated/dataModel";
import toast from "react-hot-toast";

type Props = {
  id: Id<"users">;
};

const DevControls = ({ id }: Props) => {
  const vote = useMutation(api.users.vote);
  const [voteSelected, setVoteSelected] = useState(0);

  async function onVote(value: number) {
    setVoteSelected(value);
    try {
      await vote({ id, vote: value });
    } catch (e) {
      toast.error("Error submitting your vote, try again");
      setVoteSelected(0);
    }
  }

  const votesValues = [1, 2, 3, 5, 8];

  return (
    <Card title="Choose your estimation">
      <div className="flex justify-between mt-5 text-black font-medium">
        {votesValues.map((value) => (
          <VoteCard
            key={value}
            value={value}
            selected={voteSelected === value}
            onClick={(e) => onVote(Number(e.currentTarget.value))}
          />
        ))}
      </div>
    </Card>
  );
};

export default DevControls;
