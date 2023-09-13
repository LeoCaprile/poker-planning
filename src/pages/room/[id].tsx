import { useMutation, useQuery } from "convex/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";

type Role = "dev" | "po" | "viewer";
type Status = "idle" | "ready" | "coffee";

const RoomPage = () => {
  const router = useRouter();
  const [modal, setModal] = useState(true);
  const [userId, setUserId] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const { id } = router.query as { id: Id<"rooms"> };
  const usersInRoom = useQuery(api.rooms.getUsers, { id });
  const createUser = useMutation(api.users.create);
  const deleteUser = useMutation(api.users.remove);

  async function selectRole(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    if (!userName) return;

    const role = e.currentTarget.value as Role;
    const userId = await createUser({
      name: userName,
      role,
      roomId: id,
      state: "idle",
    });
    setUserId(userId);
    setModal(false);
  }

  useEffect(() => {
    if (!userId) return;
    window.addEventListener("beforeunload", async (e) => {
      e.preventDefault();
      await deleteUser({ id: userId as Id<"users">, roomId: id });
      e.returnValue = "";
    });
  }, [userId]);

  return (
    <div>
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Users</h2>
          <ul className="flex flex-col gap-5">
            {usersInRoom && usersInRoom?.length > 0 ? (
              usersInRoom?.map((user) => (
                <li key={user.id}>
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
              ))
            ) : (
              <span>No users in room</span>
            )}
          </ul>
        </div>
      </div>

      <dialog open={modal} id="my_modal_1" className="modal">
        <div className="modal-box">
          <div className="flex flex-col justify-center items-center">
            <h2 className="font-bold text-3xl text-center">Choose your role</h2>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">What is your name?</span>
              </label>
              <input
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
                type="text"
                placeholder="Please provide your name"
                className={`input input-success w-full max-w-xs ${
                  !userName && "input-error"
                }`}
              />
            </div>
          </div>

          <div className="flex gap-5 justify-center mt-10">
            <button
              onClick={selectRole}
              value="dev"
              className="btn btn-lg btn-info"
            >
              Dev
            </button>
            <button
              onClick={selectRole}
              value="po"
              className="btn btn-lg btn-warning"
            >
              PO
            </button>
            <button
              onClick={selectRole}
              value="viewer"
              className="btn btn-lg btn-success"
            >
              Viewer
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default RoomPage;
