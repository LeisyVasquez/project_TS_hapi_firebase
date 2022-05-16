import { Server } from "@hapi/hapi";
import { getInitial, getUsers } from "../controllers/user.controllers";

export const routes = (server: Server) => {
  server.route([
    {
      method: "GET",
      path: "/",
      handler: getInitial,
      options: {
        auth: "basic"
      }
    },
    {
      method: "GET",
      path: "/usuarios",
      handler: getUsers,
      options: {
        auth: "basic"
      }
    },
  ]);
};
