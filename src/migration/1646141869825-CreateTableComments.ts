import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableComments1646141869825 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
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

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS Comments
        `);
    }
}
