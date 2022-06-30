import { IHomologateTryoutDTO } from "./IHomologateTryoutDTO"

interface ILabor {
    id: string
    description: string
    amount: number
    id_injection_process?: string
  }
  interface IMold {
    id: string
    number_cavity: number
    desc_mold: string
    id_injection_process?: string
  }
  interface IMachine {
    id: string
    model: string
    id_injection_process?: string
  }
  
  interface IFeedstock {
    id: string
    code: string
    description: string
    id_injection_process?: string
    
  }


export interface IInjectioinProcessDTO { 
  
    id?: string;
    id_tryout: string;
    proc_technician: Object;
    quantity: number;
    feedstock?: IFeedstock;
    labor?: ILabor
    mold?: IMold
    // machine?: IMachine
}

export interface ISolicitationTryoutDTO { 
    id: string;
    number_tryout: number;
    code_sap: string;
    desc_product: string;
    client: string;
    programmed_date: Date;
    reason: string;
    homologation?: IHomologateTryoutDTO,
    injectionProcess?: IInjectioinProcessDTO
}