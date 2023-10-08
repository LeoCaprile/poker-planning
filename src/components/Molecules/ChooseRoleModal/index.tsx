import Modal from "@/components/Atoms/Modal";
import { useRouter } from "next/router";
import React from "react";
import { Id } from "../../../../convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Role, useUserStore } from "@/store/userStore";
import toast from "react-hot-toast";

const DEV_USER_ROLE_LIMIT = 12;

const ChooseRoleModal = () => {
  const router = useRouter();
  const { id } = router.query as { id: Id<"rooms"> };
  const users = useQuery(api.rooms.getUsers, { id });
  const createUser = useMutation(api.users.create);
  const { name, modal, setUser, setUserName } = useUserStore();

  async function selectRole(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    if (!name) {
      toast.error("To enter the room you need to provide your name");
      return;
    }

    const role = e.currentTarget.value as Role;

    const userIdFromback = await createUser({
      name,
      role,
      roomId: id,
      state: "idle",
    });
    setUser({ userId: userIdFromback, role, modal: false });
  }

  const hasDevUsersLimit =
    users?.filter((user) => user?.role === "dev").length >= DEV_USER_ROLE_LIMIT;

  return (
    <Modal open={modal} title="Choose your role">
      <div className="form-control w-full items-center">
        <label className="label">
          <span className="label-text">What is your name?</span>
        </label>
        <input
          onChange={(e) => setUserName(e.target.value)}
          value={name}
          type="text"
          maxLength={15}
          placeholder="Please provide your name"
          className={`input input-success w-full max-w-xs ${
            !name && "input-error"
          }`}
        />
      </div>
      <div className="flex md:flex-row flex-col gap-5 justify-center mt-10">
        <div
          className={hasDevUsersLimit && "tooltip"}
          data-tip="This room reach the limit for this role"
        >
          <button
            disabled={hasDevUsersLimit}
            onClick={selectRole}
            value="dev"
            className="btn btn-lg btn-info w-full"
          >
            Dev
          </button>
        </div>
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
    </Modal>
  );
};

export default ChooseRoleModal;
