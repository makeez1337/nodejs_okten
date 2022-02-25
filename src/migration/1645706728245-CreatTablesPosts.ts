import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatTablesPosts1645706728245 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS Posts(
                id INT PRIMARY KEY AUTO_INCREMENT,
                title VARCHAR (250) NOT NULL UNIQUE,
                text VARCHAR (250) NOT NULL,
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

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS Posts
        `);
    }
}
