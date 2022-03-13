"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = exports.UsersRepository = void 0;
const typeorm_1 = require("typeorm");
const user_1 = require("../../entity/user");
let UsersRepository = class UsersRepository extends typeorm_1.Repository {
    async getUsers() {
        return (0, typeorm_1.getManager)().getRepository(user_1.User).find({ relations: ['posts'] });
    }
    async createUser(user) {
        return (0, typeorm_1.getManager)().getRepository(user_1.User).save(user);
    }
    async updatedUser(password, email, id) {
        return (0, typeorm_1.getManager)()
            .getRepository(user_1.User)
            .update({ id }, {
            password, email,
        });
    }
    async getUserByEmail(email) {
        return (0, typeorm_1.getManager)().getRepository(user_1.User)
            .createQueryBuilder('user')
            .where('user.email = :email', { email })
            .andWhere('user.deletedAt IS NULL')
            .getOne();
    }
    async deleteUser(id) {
        return (0, typeorm_1.getManager)()
            .getRepository(user_1.User).softDelete({ id });
    }
};
UsersRepository = __decorate([
    (0, typeorm_1.EntityRepository)(user_1.User)
], UsersRepository);
exports.UsersRepository = UsersRepository;
exports.userRepository = new UsersRepository();
//# sourceMappingURL=usersRepository.js.map