import { emailActionEnum } from './enums';

export const emailInfo = {
    [emailActionEnum.WELCOME]: {
        subject: 'Welcome',
        html: '<b>HELLO FROM NODEMAILER</b>',
    },
    [emailActionEnum.ACCOUNT_WAS_BLOCKED]: {
        subject: 'FORBIDDEN',
        html: '<b>Sorry, but your account was blocked</b>',
    },
    [emailActionEnum.SUCCESS_REGISTERED]: {
        subject: 'Congratulations',
        html: 'Your account successfully registered',
    },
};
