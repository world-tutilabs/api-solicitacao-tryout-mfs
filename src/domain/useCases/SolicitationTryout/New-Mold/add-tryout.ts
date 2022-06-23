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
export interface AddTryoutModel {
  code_sap: string
  product_description: string
  client: string
  date: Date
  reason: string
  status: number
  InjectionProcess: InjectionProcess 
}

export interface AddTryout {
  add (tryout: AddTryoutModel ): Promise<ISolicitationTryoutDTO>
}