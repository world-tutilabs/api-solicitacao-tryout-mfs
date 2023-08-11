import { IListByReasonTryout } from "../../../domain/useCases/SolicitationTryout/New-Mold/list-by-reason-tryout";
import { serverError, ok } from "../../helpers/http-helper";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";

export class ListByReasonTryoutController implements Controller {
  constructor(private readonly listByReasonTryout: IListByReasonTryout) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { limit, offset, status } = httpRequest.query;

      const list = await this.listByReasonTryout.listByReason(
        limit,
        offset,
        status
      );

      return ok(list);
    } catch (error) {
      console.log(error);

      return serverError(error);
    }
  }
}
