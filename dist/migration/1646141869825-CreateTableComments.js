"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableComments1646141869825 = void 0;
class CreateTableComments1646141869825 {
    async up(queryRunner) {
        await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS Comments (
            id INT PRIMARY KEY AUTO_INCREMENT,
            text VARCHAR (250) NOT NULL,
            authorId INT NOT NULL,
            postId INT NOT NULL,
            likes INT NOT NULL,
            dislikes INT NOT NULL,
            createdAt TIMESTAMP DEFAULT (UTC_TIMESTAMP) NOT NULL,
            deletedAt TIMESTAMP,
            
            CONSTRAINT fk_authorId 
            FOREIGN KEY (authorId)
                REFERENCES Users(id)
                ON DELETE CASCADE 
                ON UPDATE CASCADE
            ,
            CONSTRAINT fk_postId
            FOREIGN KEY (postId)
                REFERENCES Posts(id)
                ON UPDATE CASCADE 
                ON DELETE CASCADE 
        )
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
            DROP TABLE IF EXISTS Comments
        `);
    }
}
exports.CreateTableComments1646141869825 = CreateTableComments1646141869825;
//# sourceMappingURL=1646141869825-CreateTableComments.js.map