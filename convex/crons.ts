import { cronJobs } from "convex/server";
import { api } from "./_generated/api";

const crons = cronJobs();
crons.interval(
  "delete rooms which are one month old",
  { minutes: 1 },
  api.rooms.deleteIdleRooms
);
export default crons;
