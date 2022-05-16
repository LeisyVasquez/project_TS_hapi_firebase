import Boom from "@hapi/boom"

export const getAccessToken = (authorizationHeader: String) => {
    if(!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
        throw new Boom.Boom("", {statusCode: 401})
    } else {
        return authorizationHeader.replace(/Bearer/gi, "").replace(/ /g, "")
    }
}