import dynamic from "next/dynamic";
import { ChooseRoleModal } from "../ChooseRoleModal";
import { UserRoleT, UserRoles } from "../types";
const DevControls = dynamic(() => import("./DevControls"));
const PoControls = dynamic(() => import("./PoControls"));

interface Props {
  role: UserRoleT;
}

export default function UserControls({ role }: Props) {
  return (
    <>
      <div className="fixed bottom-0 w-full mb-5">
        {role === UserRoles.dev && <DevControls />}
        {role === UserRoles.po && <PoControls />}
      </div>
      <ChooseRoleModal />
    </>
  );
}
