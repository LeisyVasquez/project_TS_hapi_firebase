import { Server } from "@hapi/hapi";
import { routes } from "./routes/user.routes";
import { scheme_basic } from "./firebase-admin/methods-schemes";

//Inicializar servidor
(async () => {
  const server = new Server({
    port: 3005,
    host: "localhost",
    routes: { cors: { origin: ["*"] } },
  });



  server.auth.scheme("scheme_basic", scheme_basic);
  server.auth.strategy("basic", "scheme_basic");

  routes(server);

  //Otener puerto del .env

  await server.start();
  console.log("Servidor corriendo en %s", server.info.uri);
})();

//Manejar un error fatal en la aplicación
process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(0);
});
