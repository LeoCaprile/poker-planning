import Modal from "@/components/Atoms/Modal";
import { useRouter } from "next/router";
import React from "react";
import { Id } from "../../../../convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  userName: string;
  selectRole: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  open: boolean;
};

const DEV_USER_ROLE_LIMIT = 12;

const ChooseRoleModal = ({ onChange, userName, selectRole, open }: Props) => {
  const router = useRouter();
  const { id } = router.query as { id: Id<"rooms"> };

  const users = useQuery(api.rooms.getUsers, { id });

  const hasDevUsersLimit =
    users?.filter((user) => user?.role === "dev").length >= DEV_USER_ROLE_LIMIT;

  return (
    <Modal open={open} title="Choose your role">
      <div className="form-control w-full items-center">
        <label className="label">
          <span className="label-text">What is your name?</span>
        </label>
        <input
          onChange={onChange}
          value={userName}
          type="text"
          maxLength={23}
          placeholder="Please provide your name"
          className={`input input-success w-full max-w-xs ${
            !userName && "input-error"
          }`}
        />
      </div>
      <div className="flex gap-5 justify-center mt-10">
        <div
          className={hasDevUsersLimit && "tooltip"}
          data-tip="This room reach the limit for this role"
        >
          <button
            disabled={hasDevUsersLimit}
            onClick={selectRole}
            value="dev"
            className="btn btn-lg btn-info"
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
