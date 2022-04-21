"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableTokens1646998212598 = void 0;
class CreateTableTokens1646998212598 {
    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS Tokens(
                id INT PRIMARY KEY AUTO_INCREMENT,
                refreshToken VARCHAR(255) NOT NULL,
                userId INT NOT NULL,
                FOREIGN KEY(userId) REFERENCES Users(id)
            )
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
            DROP TABLE IF EXISTS Tokens
        `);
    }
}
exports.CreateTableTokens1646998212598 = CreateTableTokens1646998212598;
//# sourceMappingURL=1646998212598-CreateTableTokens.js.map