import CreateRoomButton from "@/modules/Room/CreateRoomButton";
import React from "react";
import { PiSmileySadBold } from "react-icons/pi";
const Page404 = () => {
  return (
    <div className="grid place-content-center h-screen">
      <div className="flex flex-col items-center">
        <PiSmileySadBold className="text-6xl" />
        <h1 className="text-center text-3xl">Room not found</h1>
        <CreateRoomButton />
      </div>
    </div>
  );
};

export default Page404;
