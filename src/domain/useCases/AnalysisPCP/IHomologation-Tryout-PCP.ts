
export interface IHomologate {
    id: string;
    fk_solicitation?: string;
    userHomologate?: object;
    status: number; 
    comment?: string;
}

export interface IHomologationTryoutPCP {
   homologateTryout(data: IHomologate): Promise<void> 
}