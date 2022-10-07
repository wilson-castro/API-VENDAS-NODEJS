import nodemailer from 'nodemailer';
import HandlebarsMailTemplate from '../mail/HandlebarsMailTemplate';

interface ITemplateVariable {
  [key: string]: string | number;
}

interface IParseMailTemplate {
  file: string;
  variables: ITemplateVariable;
}

interface IMailContact {
  name: string;
  email: string;
}
interface ISendMail {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParseMailTemplate;
}

export default class EtherealMail {
  static async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMail): Promise<void> {
    const account = await nodemailer.createTestAccount();

    const mailTemplate = new HandlebarsMailTemplate();

    const transporter = await nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });

    const message = await transporter.sendMail({
      to: {
        name: to.name,
        address: to.email,
      },
      from: {
        name: from?.name || 'Equipe API-VENDAS',
        address: from?.email || 'equipe@apivendas.com.br',
      },
      subject,
      html: await mailTemplate.parse(templateData),
    });

    // eslint-disable-next-line no-console
    console.log('Message sent: %s', message.messageId);
    // eslint-disable-next-line no-console
    console.log('Prewi URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
