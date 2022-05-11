import { Request, ResponseToolkit, ResponseObject } from "@hapi/hapi";
import { pool } from "../database/config";
import { QueryResult } from "pg";

export const getInitial = async (
  req: Request,
  h: ResponseToolkit
): Promise<ResponseObject> => {
  return h.response("Hello world");
};

export const getUsers = async (
  req: Request,
  h: ResponseToolkit
): Promise<ResponseObject> => {
    let cliente = await pool.connect();
  try {
    let query = "SELECT * FROM adm.usuarios";
    const { rows }: QueryResult = await cliente.query(query);
    return h.response(rows);
  } catch (err) {
    console.log(err);
    return h
      .response({
        statusCode: 500,
        message: "Internal Error Server",
      })
      .code(500);
  } finally {
      cliente.release(true)
  }
};
