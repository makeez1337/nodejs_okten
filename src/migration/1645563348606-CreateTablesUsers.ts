import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTablesUsers1645563348606 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
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

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
        DROP TABLE IF EXISTS Users
        `);
    }
}
