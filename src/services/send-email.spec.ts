import "reflect-metadata";
import { GoogleEmailSender } from "./send-email";
import { expect } from 'chai';

describe("GoogleEmailSender", () => {
    it("composes am email with the correct RAW", async () => {
        const mailer = new GoogleEmailSender({
            users: {
                messages: {
                    send: (request, cb) => {
                        cb(null, request);
                    }
                }
            }
        } as any);

        const res = await mailer.sendEmail("ryan", "This is a subject", "Pls", "image1.png", new File([""], "image1.png"));
        expect(res).to.not.be.null("string");
    })
})