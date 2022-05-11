import { Server } from "@hapi/hapi";
import { routes } from "./routes/user.routes";

//Inicializar servidor
(async () => {
  const server = new Server({
    port: 3000,
    host: "localhost",
    routes: { cors: { origin: ["*"] } },
  });

  routes(server);

  //Otener puerto del .env

  await server.start(); 
  console.log('Servidor corriendo en %s', server.info.uri)
})();

//Manejar un error fatal en la aplicación 
process.on('unhandledRejection', err => {
    console.log(err)
    process.exit(0)
})

