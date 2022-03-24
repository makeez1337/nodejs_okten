"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonValidator = void 0;
const celebrate_1 = require("celebrate");
const constants_1 = require("../../constants");
exports.commonValidator = {
    emailValidator: celebrate_1.Joi.string().required().regex(constants_1.regexp.EMAIL_REGEXP),
    passwordValidator: celebrate_1.Joi.string().alphanum().required().min(8),
};
//# sourceMappingURL=commonValidator.js.map