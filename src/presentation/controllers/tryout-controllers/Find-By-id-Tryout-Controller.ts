import { IFindById } from "../../../domain/useCases/SolicitationTryout/New-Mold/find-by-id";
import { ok } from "../../helpers/http-helper";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";

export class FindByIdTryoutController implements Controller {
  constructor(private readonly findById: IFindById) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
      const { id } = httpRequest.params;

      const list = await this.findById.findById(id);

      return ok(list);
  }
}
