import { IListTryout } from "../../../domain/useCases/SolicitationTryout/New-Mold/list-tryout";
import { IListByStatus } from "../../../domain/useCases/SolicitationTryout/New-Mold/listByStatus-tryout";
import { serverError, ok } from "../../helpers/http-helper";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";

export class ListByStatusTryoutController implements Controller {
  constructor(private readonly listByStatus: IListByStatus) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { limit, offset, status } = httpRequest.query;

      const list = await this.listByStatus.listByStatus(limit, offset, status);

      return ok(list);
    } catch (error) {
      return serverError(error);
    }
  }
}
