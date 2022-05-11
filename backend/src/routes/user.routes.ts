import { Server } from "@hapi/hapi";
import { getInitial, getUsers } from "../controllers/user.controllers";

export const routes = (server: Server) => {
  server.route([
    {
      method: "GET",
      path: "/",
      handler: getInitial,
    },
    {
      method: "GET",
      path: "/usuarios",
      handler: getUsers,
    },
  ]);
};
