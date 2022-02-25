"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTablesUsers1645563348606 = void 0;
class CreateTablesUsers1645563348606 {
    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS Users(
                id INT PRIMARY KEY AUTO_INCREMENT,
                firstName VARCHAR(250) NOT NULL,
                lastName VARCHAR(250) NOT NULL,
                age INT check (age > 0),
                phone VARCHAR (250) NOT NULL UNIQUE,
                email VARCHAR (250) NOT NULL UNIQUE,
                password VARCHAR (250) NOT NULL,
                createdAd TIMESTAMP DEFAULT(UTC_TIMESTAMP()) NOT NULL,
                deletedAt TIMESTAMP 
            )
        `);
    }
    async down(queryRunner) {
        queryRunner.query(`
        DROP TABLE IF EXISTS Users
        `);
    }
}
exports.CreateTablesUsers1645563348606 = CreateTablesUsers1645563348606;
//# sourceMappingURL=1645563348606-CreateTablesUsers.js.map