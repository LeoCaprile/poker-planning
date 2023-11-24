import { ChooseRoleModal } from "../ChooseRoleModal";
import { UserRoleT, UserRoles } from "../types";
import { DevControls } from "./DevControls";
import { PoControls } from "./PoControls";

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
