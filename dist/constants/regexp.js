"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.regexp = void 0;
exports.regexp = {
    // eslint-disable-next-line max-len
    EMAIL_REGEXP: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    // eslint-disable-next-line max-len
    PHONE_REGEXP: /^\+[0-9]{3}\s\((\d+)\)-\d{3}-\d{2}-\d{2}/, // EXAMPLE PHONE +380 (67)-995-33-63 ONLY UKRAINIAN NUMBERS,
};
//# sourceMappingURL=regexp.js.map