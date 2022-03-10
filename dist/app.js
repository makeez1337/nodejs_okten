"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
require("reflect-metadata");
const apiRouter_1 = require("./routes/apiRouter");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(apiRouter_1.apiRouter);
app.listen(5200, async () => {
    console.log('Server on PORT 5200 has started');
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