import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import UserList from "@/modules/User/UserList";
import EstimationTable from "@/modules/Room/EstimationTable";
import { ErrorBoundary } from "react-error-boundary";
import Loader from "@/components/Atoms/Loader";
import Page404 from "@/components/Atoms/404";
import { Id } from "@convex/_generated/dataModel";
import { useRouter } from "next/router";
import { useUserStore } from "@/modules/User/store/userStore";
import useRemoveUser from "@/hooks/useRemoveUser";
import RoomToClipboard from "@/modules/ToolBar/RoomToClipboard";
import UserControls from "@/modules/User/UserControls/UserControls";

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
          <EstimationTable />
        </div>

        <UserControls role={role} />
      </div>
    </ErrorBoundary>
  );
};

export default RoomPage;
