import Modal from "@/components/Atoms/Modal";
import React from "react";
type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  userName: string;
  selectRole: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  open: boolean;
};

const ChooseRoleModal = ({ onChange, userName, selectRole, open }: Props) => {
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
          placeholder="Please provide your name"
          className={`input input-success w-full max-w-xs ${
            !userName && "input-error"
          }`}
        />
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
    </Modal>
  );
};

export default ChooseRoleModal;
