import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from "nodemailer";


const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "ac05c1dc639e34",
      pass: "86f4185c02236e"
    }
  });

export class NodemailerMailAdapter implements MailAdapter{
    async sendMail({subject, body}: SendMailData) {
        await transport.sendMail({
        from: 'Equipe FeedbackPlugin <suporte@feedbackplugin.com>',
        to: 'Herivelton Santos <herisilvasantos@gmail.com>',
        subject,
        html: body,
    });
    }
}