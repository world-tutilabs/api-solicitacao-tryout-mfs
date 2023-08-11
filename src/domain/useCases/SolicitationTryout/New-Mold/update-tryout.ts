import { ISolicitationTryoutDTO } from "../../../models/ISolicitationTryoutDTO";

interface Labor {
  description: string;
  amount: number;
}
interface Molde {
  number_cavity: number;
  mold: string;
}
interface Feedstock {
  kg: number;
  description: string;
}
interface Machine {
  id: string;
  model: string;
  id_injection_process: string;
}
interface InjectionProcess {
  proc_technician: object;
  quantity: number;
  labor: Labor;
  mold: Molde;
  feedstocks: Feedstock;
  machine: Machine;
}
export interface UpdateTryoutModel {
  id: string;
  code_sap: string;
  product_description: string;
  client: string;
  date: Date;
  reason: any;
  code?: string;
  status: number;
  InjectionProcess: InjectionProcess;
}
export interface UpdateTryout {
  update(tryoutData: UpdateTryoutModel): Promise<ISolicitationTryoutDTO>;
}
