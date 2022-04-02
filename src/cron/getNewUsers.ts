import cron from 'node-cron';

import { userRepository } from '../repositories';

export const getNewUsers = cron.schedule('*/10 * * * * *', async () => {
    const users = await userRepository.getNewUsers();
    console.log(users);
});
