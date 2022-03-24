"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidator = void 0;
const celebrate_1 = require("celebrate");
const common_1 = require("../common");
const constants_1 = require("../../constants");
exports.authValidator = {
    login: {
        [celebrate_1.Segments.BODY]: celebrate_1.Joi.object().keys({
            email: common_1.commonValidator.emailValidator,
            password: common_1.commonValidator.passwordValidator,
        }),
    },
    registration: {
        [celebrate_1.Segments.BODY]: celebrate_1.Joi.object().keys({
            firstName: celebrate_1.Joi.string().required(),
            lastName: celebrate_1.Joi.string().required(),
            age: celebrate_1.Joi.number().greater(0).less(100),
            password: common_1.commonValidator.passwordValidator,
            phone: celebrate_1.Joi.string().required().regex(constants_1.regexp.PHONE_REGEXP),
            email: common_1.commonValidator.emailValidator,
        }),
    },
};
//# sourceMappingURL=authValidator.js.map