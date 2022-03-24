"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addAccessToken1647687777812 = void 0;
class addAccessToken1647687777812 {
    async up(queryRunner) {
        await queryRunner.query(`
        ALTER TABLE Tokens ADD COLUMN accessToken VARCHAR (255) NOT NULL 
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
        ALTER TABLE Tokens DROP COLUMN accessToken;
        `);
    }
}
exports.addAccessToken1647687777812 = addAccessToken1647687777812;
//# sourceMappingURL=1647687777812-addAccessToken.js.map