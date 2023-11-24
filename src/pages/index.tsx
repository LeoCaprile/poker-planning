import CreateRoomButton from "@/modules/Room/CreateRoomButton";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-center items-center">
      <h1 className="text-6xl text-center">Poker planing</h1>
      <CreateRoomButton />
    </main>
  );
}
