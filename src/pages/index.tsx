import CreateRoomButton from "@/components/Molecules/CreateRoomButton";

export default function Home() {
  return (
    <main className={`flex min-h-screen flex-col justify-center items-center`}>
      <h1 className="text-6xl">Poker planing</h1>
      <CreateRoomButton />
    </main>
  );
}
