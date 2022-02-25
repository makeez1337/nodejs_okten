"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const user_1 = require("./entity/user");
require("reflect-metadata");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/users', async (req, res) => {
    const users = await (0, typeorm_1.getManager)().getRepository(user_1.User).find();
    console.log(users);
    res.json(users);
});
app.post('/users', async (req, res) => {
    const newUser = await (0, typeorm_1.getManager)().getRepository(user_1.User).save(req.body);
    res.json(newUser);
});
app.patch('/users/:id', async (req, res) => {
    const { password, email } = req.body;
    const updatedUser = await (0, typeorm_1.getManager)()
        .getRepository(user_1.User)
        .update({ id: Number(req.params.id) }, {
        password, email,
    });
    res.json(updatedUser);
});
app.delete('/users/:id', async (req, res) => {
    const deletedUser = (0, typeorm_1.getManager)().getRepository(user_1.User).delete({ id: Number(req.params.id) });
    res.json(deletedUser);
});
app.listen(5000, async () => {
    console.log('Server on PORT 5000 has started');
    try {
        const connection = await (0, typeorm_1.createConnection)();
        if (connection) {
            console.log('Database is connected');
        }
    }
    catch (e) {
        if (e) {
            console.log(e);
        }
    }
});
//# sourceMappingURL=app.js.map