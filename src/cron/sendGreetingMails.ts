import cron from 'node-cron';
import { emailService, userService } from '../services';
import { EmailActionEnum } from '../constants';

export const sendGreetingMails = cron.schedule('*/10 * * * * *', async () => {
    const users = await userService.getUserEmails();
    const mailList:Array<string> = [];
    users.map((user) => mailList.push(user.user_email));
    await emailService.sendMail(EmailActionEnum.SEND_GREETING_MAILS, mailList);
});
