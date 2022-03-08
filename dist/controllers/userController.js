"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = exports.UserController = void 0;
const userService_1 = require("../services/userService");
class UserController {
    async getUsers(req, res) {
        const users = await userService_1.userService.getUsers();
        // const users = await getManager().getRepository(User)
        //     .createQueryBuilder('user')
        //     .innerJoin('Posts', 'posts', 'posts.userId = user.id')
        //     .getMany();
        return res.json(users);
    }
    async createUser(req, res) {
        const newUser = await userService_1.userService.createUser(req.body);
        return res.json(newUser);
    }
    async updateUser(req, res) {
        const { password, email } = req.body;
        console.log(req.body);
        const updatedUser = await userService_1.userService.updateUser(password, email, Number(req.params.id));
        return res.json(updatedUser);
    }
    async deleteUser(req, res) {
        const deletedUser = await userService_1.userService.deleteUser(Number(req.params.id));
        return res.json(deletedUser);
    }
}
exports.UserController = UserController;
exports.userController = new UserController();
//# sourceMappingURL=userController.js.map