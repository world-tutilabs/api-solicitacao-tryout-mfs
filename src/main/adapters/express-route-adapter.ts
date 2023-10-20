import { query, Request, Response } from "express";
import { Controller } from "../../presentation/protocols";

export const adaptRoute = (controller: Controller) => {
  return async function (req: Request, res: Response) {
    const httpRequest = {
      body: req.body,
      params: req.params,
      query: req.query,
    };
    const httpResponse = await controller.handle(httpRequest);
    if (httpResponse.statusCode === 200 || httpResponse.statusCode === 204) {
      res.status(httpResponse.statusCode).json(httpResponse.body);
    } else {
      res
        .status(httpResponse.statusCode)
        .json({ error: httpResponse.body.message });
    }
  };
};
