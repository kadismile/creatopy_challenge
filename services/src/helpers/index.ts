import accessEnv from "../helpers/accessEnv";
import * as nodemailer from "nodemailer";

const kue = require('kue')

export class ErrorHandler {
  private message: string;
  constructor(message: string) {
    this.message = message;
  }
}


export async function sendEmail(type: string) {
  try {

    const GMAIL_USERNAME = accessEnv("GMAIL_USERNAME", "")
    const GMAIL_PASSWORD = accessEnv("GMAIL_PASSWORD", "")
    const MAIL_HOST = accessEnv("MAIL_HOST", "")
    const MAIL_SERVICE = accessEnv("MAIL_SERVICE", "")
    const MAIL_PORT = accessEnv("MAIL_PORT", "")
    const FROM_EMAIL = accessEnv("FROM_EMAIL", "")
    const FROM_NAME = accessEnv("FROM_NAME", "")


    const queue = kue.createQueue();
    queue.process(type, function (job: any, done: any) {
      const emailData = job.data;
      const transporter = nodemailer.createTransport({
        host: MAIL_HOST,
        service: MAIL_SERVICE,
        port: MAIL_PORT,
        secure: true,
        auth: {
          user: GMAIL_USERNAME,
          pass: GMAIL_PASSWORD
        }
      });

      const message = {
        from: `${FROM_NAME} <${FROM_EMAIL}>`,
        to: emailData.email,
        subject: emailData.subject,
        html: `<html lang="en">
                <head>
                    <title>Reset Your Password</title>
                </head>
                <body>
                <h2>Reset Your Password</h2>
                    <p>You are receiving this email because you (or someone else) has requested
                    the reset of a password. Please click the link to: <a href=${emailData.resetPasswordUrl}> Reset Ur Password</a>
                </p>
                </body>
            </html>`
      };
      transporter.sendMail(message);
      console.log("mail sent _________>>>>>>>")
      transporter.sendMail(message);
      done()
      return 1
    });
  } catch (e) {
    console.log("error _____", e)
  }
}
