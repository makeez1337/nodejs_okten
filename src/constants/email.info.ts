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
};
