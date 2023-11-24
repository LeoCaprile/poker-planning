import { cronJobs } from "convex/server";
import { api } from "./_generated/api";

const crons = cronJobs();
crons.monthly(
  "delete rooms which are one month old",
  { day: 0, hourUTC: 0, minuteUTC: 0 },
  api.rooms.deleteIdleRooms
);
export default crons;
