
interface Labor {
  id: number
  description: string
  amount: number
  id_process: number
}
interface Molde {
  id: number
  number_cavity: number
  mold: string
  id_process: number
}
interface Machine {
  id: number
  model: string
  id_process: number
}

interface Feedstock {
  id: number
  code: string
  description: string
  id_injection_process: number
}
interface InjectionProcess {
  id: number
  id_tryout: number
  labor: Labor[]
  molde: Molde[]
  machine: Machine[]
  feedstock: Feedstock[]
  peripheral: object
}
export interface TryoutModel{
  id: number
  code_sap: string
  product_description: string
  client: string
  date: Date
  reason: number
  id_status: number
  InjectionProcess: InjectionProcess
}