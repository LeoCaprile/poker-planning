import VoteCard from "@/modules/User/UserControls/DevControls/VoteCard";
import { api } from "../../../../../convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { Id } from "../../../../../convex/_generated/dataModel";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { useUserStore } from "@/modules/User/store/userStore";

const DevControls = () => {
  const router = useRouter();
  const { id: roomId } = router.query as { id: Id<"rooms"> };
  const userId = useUserStore((store) => store.userId) as Id<"users">;
  const room = useQuery(api.rooms.get, { id: roomId });
  const user = useQuery(api.users.get, { id: userId });
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
      await vote({ id: userId, vote: value });
    } catch (e) {
      toast.error("Error submitting your vote, try again");
    }
  }

  return (
    <div className="flex md:justify-center gap-5 py-4 overflow-x-scroll text-black font-medium">
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
  );
};

export default DevControls;
