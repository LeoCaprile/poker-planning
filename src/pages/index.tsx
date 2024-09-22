import CreateRoomButton from "@/modules/Room/CreateRoomButton";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-[90vh] flex-col justify-center items-center">
      <Image src="/cat.png" quality={100} alt="logo" width={300} height={300} />
      <h1 className="text-6xl font-bold text-center">Poker <br /> Planning</h1>
      <CreateRoomButton />
    </main>
  );
}
