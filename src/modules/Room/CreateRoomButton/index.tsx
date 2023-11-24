import React from "react";
import { useMutation } from "convex/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { api } from "@convex/_generated/api";

const CreateRoomButton = () => {
  const [loading, setLoading] = useState(false);
  const createRoom = useMutation(api.rooms.create);
  const router = useRouter();
  async function onRoomCreated() {
    setLoading(true);
    const roomId = await createRoom();
    setLoading(false);
    router.push(`/room/${roomId}`);
  }
  return (
    <button className="btn btn-lg btn-info mt-10" onClick={onRoomCreated}>
      {loading && <span className="loading loading-spinner loading-xs"></span>}
      Create Room
    </button>
  );
};

export default CreateRoomButton;
