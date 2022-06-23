
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

  interface IHomolgation { 
    id: string,
    fk_solicitation: string,
    created_user: Object,
    created_at: Date 
    homologation_user: Object
    homologation_at: Date
    comment: string
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
    homologation?: IHomolgation,
    injectionProcess?: IInjectioinProcessDTO
}