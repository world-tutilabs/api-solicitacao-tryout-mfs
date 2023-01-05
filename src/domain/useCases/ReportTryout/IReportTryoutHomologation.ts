
export interface IHomologate {
    id: string;
    status: number; 
}

export interface IReportTryoutHomologation {
    reportTryoutHomologation(data: IHomologate): Promise<void> 
}