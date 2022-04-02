import { EmailActionEnum } from './enums';

export const emailInfo = {
    [EmailActionEnum.WELCOME]: {
        subject: 'Welcome to Sept-2021',
        templateName: 'welcome',
    },
    [EmailActionEnum.ACCOUNT_WAS_BLOCKED]: {
        subject: 'FORBIDDEN',
        templateName: 'blocked',
    },
    [EmailActionEnum.SUCCESS_REGISTERED]: {
        subject: 'Congratulations',
        templateName: 'succesRegistered',
    },
    [EmailActionEnum.FORGOT_PASS]: {
        subject: 'reset password',
        templateName: 'resetPassword',
    },
    [EmailActionEnum.SEND_GREETING_MAILS]: {
        subject: 'My greetings',
        templateName: 'sendGreetingMails',
    },
};
