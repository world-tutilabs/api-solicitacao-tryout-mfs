import { IMailProvider, IMessage } from "../IMailProvider";
import nodemailer from 'nodemailer'
import Mail from "nodemailer/lib/mailer";


export class MailtrapMailProvider implements IMailProvider{

   private transporter: Mail;

   constructor(){
    this.transporter = nodemailer.createTransport({
        // host: 'smtp.gmail.com',
        host: "smtp.office365.com",
        port: 587,
        auth: { 
            user: 'tutilabs@tutiplast.com.br',
            pass: 'BR%mC$6#3MjyX7t'
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
            html: message.body,
            attachments: message.attachments
        })

     
    }


    
}