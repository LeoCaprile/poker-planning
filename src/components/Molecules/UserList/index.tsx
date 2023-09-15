import { useQuery } from "convex/react";
import React from "react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import Card from "@/components/Atoms/Card";

type Props = {
  id: Id<"rooms">;
};

const UserList = ({ id }: Props) => {
  const usersInRoom = useQuery(api.rooms.getUsers, { id });

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
    <ul className="flex flex-col gap-5">
      {usersInRoom?.map((user) => (
        <li key={user._id}>
          <span
            className={`badge badge-lg ${
              user.state === "idle"
                ? "badge-warning"
                : user.state === "ready"
                ? "badge-success"
                : "badge-error"
            }`}
          >
            {user.name} - {user.role}
          </span>
        </li>
      ))}
    </ul>
  );
};

const UserListCard = ({ id }: Props) => (
  <Card title="Users">
    <UserList id={id} />
  </Card>
);

export default UserListCard;
