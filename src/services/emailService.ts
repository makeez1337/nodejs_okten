import nodemailer from 'nodemailer';

import { config } from '../config';
import { emailActionEnum, emailInfo } from '../constants';

class EmailService {
    public async sendMail(action:emailActionEnum, userMail:string) {
        const { subject, html } = emailInfo[action];

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
