import { injectable } from "tsyringe";
import { gmail_v1 } from "googleapis";
import MailComposer = require("nodemailer/lib/mail-composer")
import { Readable } from "stream";

/**
 * An interface that knows how to send emails to a user.
 */
 export interface EmailSender {

    sendEmail(recipient: string, subject: string, body: string, imageName: string, image: File): Promise<string>;

}

@injectable()
export class GoogleEmailSender implements EmailSender {

    constructor(private gmail: gmail_v1.Gmail) {
        /*const oauth2Client = new google.auth.OAuth2(
            config.getGoogleOAuthClientId(),
            config.getGoogleOAuthClientSecret(),
            config.getGoogleOAuthRedirectUrl()
        );

        this.gmail = google.gmail({
            version: 'v1',
            auth: oauth2Client
        });*/
    }

    sendEmail(recipient: string, subject: string, body: string, imageName: string, image: File): Promise<string> {
        let mail = new MailComposer(
            {
              to: recipient,
              text: body,
              html: `<strong> ${body} </strong>`,
              subject: subject,
              textEncoding: "base64",
              attachments: [
                {   // encoded string as an attachment
                  filename: imageName,
                  content: Readable.from(image.stream()),
                  encoding: 'base64'
                }
              ]
        });

        return new Promise((resolve, reject) => {
            mail.compile().build( (error, msg) => {
                if (error) {
                    return reject('Error compiling email ' + error);
                }

                const encodedMessage = Buffer.from(msg)
                  .toString('base64')
                  .replace(/\+/g, '-')
                  .replace(/\//g, '_')
                  .replace(/=+$/, '');

                this.gmail.users.messages.send({
                  userId: 'me',
                  requestBody: {
                    raw: encodedMessage,
                  }
                }, (err, result) => {
                    if (err) {
                        return reject('Sending email gave an error ' + error);
                    }

                    resolve("Sending data succeeded " + result.data);
                });
              })
        });
    }

}