import { httpRouter } from "convex/server";
import { removeUserHttp } from "./users";

const http = httpRouter();

http.route({
  path: "/deleteUser",
  method: "POST",
  handler: removeUserHttp,
});

export default http;
