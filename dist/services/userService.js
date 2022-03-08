"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const usersRepository_1 = require("../repositories/users/usersRepository");
class UserService {
    async getUsers() {
        const users = await usersRepository_1.userRepository.getUsers();
        return users;
    }
    async createUser(user) {
        const newUser = await usersRepository_1.userRepository.createUser(user);
        return newUser;
    }
    async updateUser(password, email, id) {
        const updatedUser = await usersRepository_1.userRepository.updatedUser(password, email, id);
        return updatedUser;
    }
    async deleteUser(id) {
        const deletedUser = await usersRepository_1.userRepository.deleteUser(id);
        return deletedUser;
    }
}
exports.userService = new UserService();
//# sourceMappingURL=userService.js.map