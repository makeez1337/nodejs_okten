import nodemailer, { SentMessageInfo } from 'nodemailer';
import EmailTemplate from 'email-templates';

import path from 'path';
import { config } from '../config';
import { EmailActionEnum, emailInfo } from '../constants';

class EmailService {
    public async sendMail(action:EmailActionEnum, userMail:string | Array<string>, context = {})
        :Promise<SentMessageInfo> {
        const { subject, templateName } = emailInfo[action];
        // @ts-ignore
        const src = global.rootDir;

        const templateRenderer = new EmailTemplate({
            views: {
                root: path.join(src, 'email-templates'),
            },
        });
        Object.assign(context, { frontendUrl: 'google.com' });

        const html = await templateRenderer.render(templateName, context);

        const emailTransported = nodemailer.createTransport({
            from: 'No Reply Sept-2021',
            service: 'gmail',
            auth: {
                user: config.NO_REPLY_EMAIL,
                pass: config.NO_REPLY_EMAIL_PASSWORD,
            },
        });

        return emailTransported.sendMail({
            to: userMail,
            subject,
            html,
        });
    }
}

export const emailService = new EmailService();
