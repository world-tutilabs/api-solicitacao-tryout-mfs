import { ISolicitationTryout } from "../../../domain/models/ISolicitationTryout";
import { TryoutModel } from "../../../domain/models/tryout";
import { AddTryoutModel } from "../../../domain/useCases/SolicitationTryout/add-tryout";
import { UpdateTryoutModel } from "../../../domain/useCases/update-tryout/update-tryout";
import { TryoutRepository } from "../../protocols/tryout-repository-protocol";

export class DBTryout implements TryoutRepository{
    
    add(tryout: AddTryoutModel): Promise<TryoutModel> {
        throw new Error("Method not implemented.");
    }
    list(): Promise<ISolicitationTryout[]> {
        throw new Error("Method not implemented.");
    }
    update(tryout: UpdateTryoutModel): Promise<TryoutModel> {
        throw new Error("Method not implemented.");
    }



}