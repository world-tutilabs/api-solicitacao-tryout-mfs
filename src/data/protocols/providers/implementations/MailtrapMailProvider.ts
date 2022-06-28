import { IMailProvider, IMessage } from "../IMailProvider";
import nodemailer from 'nodemailer'
import Mail from "nodemailer/lib/mailer";


export class MailtrapMailProvider implements IMailProvider{

   private transporter: Mail;

   constructor(){
    this.transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth: { 
            user: 'portariatutiplast@gmail.com',
            pass: 'ojxlhmmojasmluqz'
        }
    })
   }

    async sendMail(message: IMessage): Promise<void> {
        this.transporter.sendMail({
            to:{
                name: message.to.name,
                address: message.to.email,
            },
            from: {
                name: message.from.name,
                address: message.from.email,
            },
            subject: message.subject,
            html: message.body
        })
    }


    
}