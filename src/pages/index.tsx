import { useMutation } from "convex/react";
import { useRouter } from "next/router";
import { api } from "../../convex/_generated/api";
import { useEffect, useState } from "react";
export default function Home() {
  const [loading, setLoading] = useState(false);
  const createRoom = useMutation(api.rooms.create);
  const router = useRouter();

  async function onRoomCreated() {
    setLoading(true);
    const roomId = await createRoom();
    setLoading(false);
    router.push(`/room/${roomId}`);
  }
  useEffect(() => {
    const listener = () => true;
    window.addEventListener("beforeunload", listener);
    return () => window.removeEventListener("beforeunload", listener);
  }, []);
  return (
    <main className={`flex min-h-screen flex-col justify-center items-center`}>
      <h1 className="text-6xl">Poker planing</h1>
      <button className="btn btn-lg btn-info mt-10" onClick={onRoomCreated}>
        {loading && (
          <span className="loading loading-spinner loading-xs"></span>
        )}
        Create Room
      </button>
    </main>
  );
}
