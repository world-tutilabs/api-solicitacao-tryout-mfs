import { TryoutModel } from "../../models/tryout"
interface Labor {
  description: string
  amount: number
}
interface Molde {
  number_cavity: number
  mold: string
}
interface Machine {
  model: string
}
interface Peripheral {
  peripheral: object
}
interface Feedstock {
  code: string
  description: string
}
interface InjectionProcess {
  labor: Labor
  mold: Molde
  machine: Machine
  feedstocks: Feedstock
  peripherals: Peripheral
}
export interface UpdateTryoutModel {
  code_sap: string
  product_description: string
  client: string
  date: Date
  reason: number
  status: number
  InjectionProcess: InjectionProcess 
}
export interface UpdateTryout {
  update (id: number, tryout: UpdateTryoutModel): Promise<TryoutModel>
}