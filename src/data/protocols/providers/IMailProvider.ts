export interface IAttachments {
  filename: string;
  path: string;
  cid: string;
}

export interface IAddress {
     email: string;
     name: string;
}

export interface IMessage { 
 to: IAddress;
 from: IAddress;
 subject: string
 body: string;
 attachments?: IAttachments[]
}


export interface IMailProvider {
    sendMail(message: IMessage): Promise<void>
}