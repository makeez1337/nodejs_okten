"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
require("reflect-metadata");
const routes_1 = require("./routes");
const config_1 = require("./config");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(routes_1.apiRouter);
const { PORT } = config_1.config;
app.listen(PORT, async () => {
    console.log(`Server on PORT ${PORT} has started`);
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