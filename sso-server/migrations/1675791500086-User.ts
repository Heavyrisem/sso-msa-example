import { MigrationInterface, QueryRunner } from "typeorm";

export class User1675791500086 implements MigrationInterface {
    name = 'User1675791500086'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`providerId\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`providerId\` bigint NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`providerId\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`providerId\` int NOT NULL`);
    }

}
