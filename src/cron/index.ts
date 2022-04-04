// import { getNewUsers } from './getNewUsers';

import { sendGreetingMails } from './sendGreetingMails';

export const cronRun = () => {
    // getNewUsers.start();
    sendGreetingMails.start();
};
