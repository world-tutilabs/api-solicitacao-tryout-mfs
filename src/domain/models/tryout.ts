
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
  mold: Molde[]
  feedstock: Feedstock[]
}
export interface TryoutModel{
  id: number
  code_sap: string
  product_description: string
  client: string
  date: Date
  reason: string
  id_status: number
  InjectionProcess: InjectionProcess
}