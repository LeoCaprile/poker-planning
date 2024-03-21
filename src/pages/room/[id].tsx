import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import UserList from "@/modules/User/UserList";
import EstimationTable from "@/modules/Room/EstimationTable";
import { ErrorBoundary } from "react-error-boundary";
import Loader from "@/components/Atoms/Loader";
import { Id } from "@convex/_generated/dataModel";
import { useRouter } from "next/router";
import { useUserStore } from "@/modules/User/store/userStore";
import useRemoveUser from "@/hooks/useRemoveUser";
import RoomToClipboard from "@/modules/ToolBar/RoomToClipboard";
import UserControls from "@/modules/User/UserControls/UserControls";
import dynamic from "next/dynamic";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";
import useRoomStore from "@/modules/Room/store/useRoomStore";
const Page404 = dynamic(() => import("@/components/Atoms/404"), {
  loading: () => <Loader />,
});

const RoomPage = () => {
  const router = useRouter();
  const { id } = router.query as { id: Id<"rooms"> };
  const room = useQuery(api.rooms.get, { id });
  const role = useUserStore((store) => store.role);
  const confetti = useRoomStore((store) => store.confetti);

  useRemoveUser();

  if (room === undefined) return <Loader />;

  if (room === null) return <Page404 />;

  return (
    <ErrorBoundary fallback={<div>An Error has ocurred</div>}>
      {confetti && <Fireworks autorun={{ speed: 1.3 }} />}
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
