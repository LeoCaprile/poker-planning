import Image from "next/image";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Home() {
  const task = useQuery(api.queries.task.get);
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      {task?.map(({ _id, text }) => (
        <h1 key={_id.toString()}>{text}</h1>
      ))}
    </main>
  );
}
