import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import UserList from "@/components/Molecules/UserList";
import ChooseRoleModal from "@/components/Molecules/ChooseRoleModal";
import DevControls from "@/components/Molecules/DevControls";
import styles from "./room.module.css";
import CardTable from "@/components/Molecules/CardTable";
import PoControls from "@/components/Molecules/PoControls";
import { ErrorBoundary } from "react-error-boundary";
import Loader from "@/components/Atoms/Loader";
import Page404 from "@/components/Atoms/404";
import { Id } from "../../../convex/_generated/dataModel";
import { useRouter } from "next/router";
import { useUserStore } from "@/store/userStore";
import useRemoveUser from "@/hooks/useRemoveUser";

const RoomPage = () => {
  const router = useRouter();
  const { id } = router.query as { id: Id<"rooms"> };
  const room = useQuery(api.rooms.get, { id });
  const role = useUserStore((store) => store.role);
  useRemoveUser();

  if (room === undefined) return <Loader />;

  if (room === null) return <Page404 />;

  return (
    <ErrorBoundary fallback={<div>An Error has ocurred</div>}>
      <div className={styles.container}>
        <div className={styles.usersList + " hidden md:block"}>
          <UserList />
        </div>

        <div className={styles.main}>
          <CardTable />
        </div>

        {role === "dev" && (
          <div className={styles.controls}>
            <DevControls />
          </div>
        )}

        {role === "po" && (
          <div className={styles.controls}>
            <PoControls />
          </div>
        )}

        <ChooseRoleModal />
      </div>
    </ErrorBoundary>
  );
};

export default RoomPage;
