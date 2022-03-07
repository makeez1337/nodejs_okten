"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatTablesPosts1645706728245 = void 0;
class CreatTablesPosts1645706728245 {
    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS Posts(
                id INT PRIMARY KEY AUTO_INCREMENT,
                title VARCHAR (255) NOT NULL UNIQUE,
                text VARCHAR (255) NOT NULL,
                userId INT NOT NULL,
                createdAt TIMESTAMP DEFAULT(UTC_TIMESTAMP()) NOT NULL,
                deletedAt TIMESTAMP,
                
                CONSTRAINT fk_userId
                FOREIGN KEY (userId)
                    REFERENCES Users(id)
                    ON DELETE CASCADE
                    ON UPDATE CASCADE
            )
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
            DROP TABLE IF EXISTS Posts
        `);
    }
}
exports.CreatTablesPosts1645706728245 = CreatTablesPosts1645706728245;
//# sourceMappingURL=1645706728245-CreatTablesPosts.js.map