import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableActionToken1648727057183 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS ActionTokens(
                id INT AUTO_INCREMENT PRIMARY KEY,
                actionToken VARCHAR(255) NOT NULL ,
                userId INT NOT NULL,
                FOREIGN KEY(userId) REFERENCES Users(id)
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS ActionTokens
        `);
    }
}
