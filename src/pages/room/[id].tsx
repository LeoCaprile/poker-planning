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
import RoomToClipboard from "@/components/Atoms/RoomToClipboard";

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
      <RoomToClipboard />
      <div className="flex">
        <div className="top-0 right-0 m-5 md:max-w-[200px] lg:max-w-xs fixed hidden md:block">
          <UserList />
        </div>

        <div className="w-full md:mr-56 lg:mr-72 lg:ml-20 md:p-5 md:mt-12">
          <CardTable />
        </div>

        <div className="fixed bottom-0 w-full mb-5">
          {role === "dev" && <DevControls />}
          {role === "po" && <PoControls />}
        </div>
        <ChooseRoleModal />
      </div>
    </ErrorBoundary>
  );
};

export default RoomPage;
