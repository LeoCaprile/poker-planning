import { useMutation, useQuery } from "convex/react";
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
import PoControls from "@/components/Molecules/PoControls";

type Role = "dev" | "po" | "viewer";

const RoomPage = () => {
  const router = useRouter();
  const [modal, setModal] = useState(true);
  const [userId, setUserId] = useState<string>("_");
  const [userName, setUserName] = useState<string>("");
  const [role, setRole] = useState<Role>("viewer");
  const { id } = router.query as { id: Id<"rooms"> };
  const createUser = useMutation(api.users.create);

  const REMOVEUSER_ENDPOINT =
    process.env.NEXT_PUBLIC_CONVEX_HTTP_SERVER + "/deleteUser";

  useEffect(() => {
    if (!userId) return;
    window.onunload = () => {
      navigator.sendBeacon(
        REMOVEUSER_ENDPOINT,
        JSON.stringify({ id: userId, roomId: id })
      );
    };
  }, [userId]);

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
    setRole(role);
    setUserId(userIdFromback);
    setModal(false);
  }

  return (
    <div className={styles.container}>
      <div className={styles.usersList + " hidden md:block"}>
        <UserList id={id} />
      </div>

      <div className={styles.main}>
        <CardTable />
      </div>

      {role === "dev" && (
        <div className={styles.controls}>
          <DevControls id={userId as Id<"users">} />
        </div>
      )}

      {role === "po" && (
        <div className={styles.controls}>
          <PoControls />
        </div>
      )}

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
