"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const usersRepository_1 = require("../repositories/users/usersRepository");
class UserService {
    async getUsers() {
        return usersRepository_1.userRepository.getUsers();
    }
    async createUser(user) {
        const { password } = user;
        const hashedPassword = await this._hashedPassword(password);
        const dataToSave = { ...user, password: hashedPassword };
        return usersRepository_1.userRepository.createUser(dataToSave);
    }
    async updateUser(password, email, id) {
        return usersRepository_1.userRepository.updatedUser(password, email, id);
    }
    async deleteUser(id) {
        return usersRepository_1.userRepository.deleteUser(id);
    }
    async getUserByEmail(email) {
        return usersRepository_1.userRepository.getUserByEmail(email);
    }
    async _hashedPassword(password) {
        return bcrypt_1.default.hash(password, 10);
    }
}
exports.userService = new UserService();
//# sourceMappingURL=userService.js.map