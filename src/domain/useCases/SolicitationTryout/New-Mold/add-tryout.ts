import { ISolicitationTryoutDTO } from "../../../models/ISolicitationTryoutDTO"

interface Labor {
  description: string
  amount: number
}
interface Molde {
  number_cavity: number
  mold: string
}
interface Feedstock {
  code: string
  description: string
}
interface InjectionProcess {
  proc_technician: object
  quantity: number
  labor: Labor
  mold: Molde
  feedstocks: Feedstock
}
interface Homolgation { 
  id: string,
  fk_solicitation: string,
  created_user: object,
  created_at: Date 
  homologation_user: Object
  homologation_at: Date
  comment: string
}
interface User {
  nome_completo: string
  matricula: string
  nivel_de_acesso: object
}
export interface AddTryoutModel {
  code_sap: string
  product_description: string
  client: string
  date: Date
  reason: string
  status: number
  InjectionProcess: InjectionProcess
  homologation?: Homolgation
  user: User 
}

export interface AddTryout {
  add (tryout: AddTryoutModel ): Promise<ISolicitationTryoutDTO>
}