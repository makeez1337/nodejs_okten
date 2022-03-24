"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidator = void 0;
const celebrate_1 = require("celebrate");
const common_1 = require("../common");
exports.authValidator = {
    login: {
        [celebrate_1.Segments.BODY]: celebrate_1.Joi.object().keys({
            email: common_1.commonValidator.emailValidator,
            password: celebrate_1.Joi.string().required().min(4),
        }),
    },
};
//# sourceMappingURL=authValidator.js.map