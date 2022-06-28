import { ISolicitationTryoutDTO } from "./ISolicitationTryoutDTO";

interface IHomolgationStatus { 
    id: number,
    description: string
  }

export interface IHomologateTryoutDTO{
 id: string,
 fk_solicitation: string,
 solicitation?: ISolicitationTryoutDTO,
 created_user: Object,
 created_at: Date,
 homologation_user: Object,
 homologation_at: Date,
 comment: string,
 status?: IHomolgationStatus,

}