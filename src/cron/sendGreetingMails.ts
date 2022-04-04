import cron from 'node-cron';

import {
    emailService,
    userService,
} from '../services';
import { EmailActionEnum } from '../constants';

export const sendGreetingMails = cron.schedule('*/10 * * * * *', async () => {
    const users = await userService.getUserEmails();

    await Promise.allSettled(users.map(async (user) => {
        await emailService.sendMail(EmailActionEnum.SEND_GREETING_MAILS, user.user_email);
    }));
});
