import { MigrationInterface, QueryRunner } from "typeorm";

export class User1675791856833 implements MigrationInterface {
    name = 'User1675791856833'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`providerId\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`providerId\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`providerId\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`providerId\` bigint NOT NULL`);
    }

}
