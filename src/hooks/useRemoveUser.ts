import { useUserStore } from "@/modules/User/store/userStore";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Id } from "../../convex/_generated/dataModel";

export default function useRemoveUser() {
  const router = useRouter();
  const { id } = router.query as { id: Id<"rooms"> };
  const { userId } = useUserStore();

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
  }, [userId, id, REMOVEUSER_ENDPOINT]);

  return null;
}
