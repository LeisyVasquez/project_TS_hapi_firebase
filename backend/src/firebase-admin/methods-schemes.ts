import { Request, ResponseToolkit, Auth } from "@hapi/hapi";
const admin = require("./firebase-config");
import Boom from "@hapi/boom";
import { getAccessToken } from "../utilities/general-functions";

export const scheme_basic = () => {
  return {
    authenticate: async (
      request: Request,
      h: ResponseToolkit
    ): Promise<Auth> => {
      //Entrada
      const accesToken = getAccessToken(request.headers.authorization);
      try {
        //Verificar con Firebase Admin, además verificamos si el token está revocado
        let checkRevoked = true;
        const decoded = await admin
          .auth()
          .verifyIdToken(accesToken, checkRevoked);
        if (!decoded) throw new Error("Token invalido");
        return h.authenticated({
            credentials: decoded, 
            artifacts: {
                roleName: "Admin"
            }
        })
      } catch ({code}) {
          if(code === "auth/id-token-expired") {
            throw new Boom.Boom("Token expirado", {statusCode: 412})
          } else {
            throw Boom.boomify(Boom.unauthorized(null, "scheme-basic" ))
          }
      }
    },
  };
};
