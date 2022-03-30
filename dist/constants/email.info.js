"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailInfo = void 0;
const enums_1 = require("./enums");
exports.emailInfo = {
    [enums_1.EmailActionEnum.WELCOME]: {
        subject: 'Welcome to Sept-2021',
        templateName: 'welcome',
    },
    [enums_1.EmailActionEnum.ACCOUNT_WAS_BLOCKED]: {
        subject: 'FORBIDDEN',
        templateName: 'blocked',
    },
    [enums_1.EmailActionEnum.SUCCESS_REGISTERED]: {
        subject: 'Congratulations',
        templateName: 'succesRegistered',
    },
};
//# sourceMappingURL=email.info.js.map