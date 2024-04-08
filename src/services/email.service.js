import pkg from 'nodemailer';
const { createTransport } = pkg;

export class EmailService {
  transporter

  constructor() {
    this.transporter = createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure:true,
      auth: {
        user: process.env.MAILEREMAIL,
        pass: process.env.MAILERPASS,
      },
    })
  }

  async sendEmail(options) {
    const { to, subject, htmlBody, attachements = [] } = options

    try {
      const sentInformation = await this.transporter.sendMail({
        to: to,
        subject: subject,
        html: htmlBody,
        attachments: attachements,
      })

      // console.log( sentInformation );

      return true
    } catch (error) {
      return false
    }
  }
}
