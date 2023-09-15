import { useMutation } from "convex/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import UserList from "@/components/Molecules/UserList";
import { useBeforeunload } from "react-beforeunload";
import ChooseRoleModal from "@/components/Molecules/ChooseRoleModal";
import DevControls from "@/components/Molecules/DevControls";
import styles from "./room.module.css";
import toast from "react-hot-toast";
import CardTable from "@/components/Molecules/CardTable";

const useUnload = (fn: any) => {
  const cb = React.useRef(fn);

  React.useEffect(() => {
    const onUnload = cb.current;
    window.addEventListener("beforeunload", onUnload);
    return () => {
      window.removeEventListener("beforeunload", onUnload);
    };
  }, [cb]);
};

const RoomPage = () => {
  const router = useRouter();
  const [modal, setModal] = useState(true);
  const [userId, setUserId] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const { id } = router.query as { id: Id<"rooms"> };
  const createUser = useMutation(api.users.create);

  type Role = "dev" | "po" | "viewer";
  type Status = "idle" | "ready" | "coffee";

  async function selectRole(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    if (!userName) {
      toast.error("To enter the room you need to provide your name");
      return;
    }

    const role = e.currentTarget.value as Role;

    const userIdFromback = await createUser({
      name: userName,
      role,
      roomId: id,
      state: "idle",
    });

    setUserId(userIdFromback);
    setModal(false);
  }

  return (
    <div className={styles.container}>
      <div className={styles.usersList}>
        <UserList id={id} />
      </div>

      <div className={styles.main}>
        <CardTable />
      </div>

      <div className={styles.controls}>
        <DevControls id={userId as Id<"users">} />
      </div>
      <ChooseRoleModal
        onChange={(e) => setUserName(e.target.value)}
        open={modal}
        userName={userName}
        selectRole={selectRole}
      />
    </div>
  );
};

export default RoomPage;
