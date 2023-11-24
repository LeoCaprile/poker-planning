import { useQuery } from "convex/react";
import React from "react";
import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";
import Card from "@/components/Atoms/Card";
import { useRouter } from "next/router";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { UserState } from "../types";

const UserList = () => {
  const router = useRouter();
  const { id } = router.query as { id: Id<"rooms"> };
  const usersInRoom = useQuery(api.rooms.getUsers, { id });
  const [parent] = useAutoAnimate();

  if (!usersInRoom) {
    return (
      <p>
        loading user list <span className="loading loading-dots loading-xs" />
      </p>
    );
  }

  if (usersInRoom && usersInRoom?.length === 0) {
    return <div>No users in room</div>;
  }

  return (
    <ul ref={parent} className="flex flex-col gap-5">
      {usersInRoom?.map((user) => (
        <li className=" whitespace-nowrap" key={user._id}>
          <div
            className={`badge badge-lg  ${
              {
                [UserState.idle]: "badge-warning",
                [UserState.ready]: "badge-success",
              }[user.state] ?? "badge-danger"
            }`}
          >
            <p>
              <span className="block md:max-w-[5rem] lg:max-w-[9rem] text-ellipsis overflow-hidden">
                {user.name}
              </span>
            </p>
          </div>

          <div className="badge badge-lg badge-primary ml-2">
            <p>
              <span className="block text-ellipsis overflow-hidden">
                {user.role}
              </span>
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

const UserListCard = () => (
  <Card title="Users">
    <UserList />
  </Card>
);

export default UserListCard;
