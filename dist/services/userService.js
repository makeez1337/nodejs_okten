"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const repositories_1 = require("../repositories");
class UserService {
    async getUsers() {
        return repositories_1.userRepository.getUsers();
    }
    async createUser(user) {
        const { password } = user;
        const hashedPassword = await this._hashedPassword(password);
        const dataToSave = { ...user, password: hashedPassword };
        return repositories_1.userRepository.createUser(dataToSave);
    }
    async updateUser(password, email, id) {
        return repositories_1.userRepository.updatedUser(password, email, id);
    }
    async deleteUser(id) {
        return repositories_1.userRepository.deleteUser(id);
    }
    async getUserByEmail(email) {
        return repositories_1.userRepository.getUserByEmail(email);
    }
    async compareUserPaswords(password, hash) {
        const isPasswordsEqual = await bcrypt_1.default.compare(password, hash);
        if (!isPasswordsEqual) {
            throw new Error('Email or password is not valid');
        }
    }
    async _hashedPassword(password) {
        return bcrypt_1.default.hash(password, 10);
    }
}
exports.userService = new UserService();
//# sourceMappingURL=userService.js.map