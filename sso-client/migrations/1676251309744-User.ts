import { MigrationInterface, QueryRunner } from "typeorm";

export class User1676251309744 implements MigrationInterface {
    name = 'User1676251309744'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`password\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`providerId\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_0ad4792ebd254550ad4fdb55d6\` (\`providerId\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP INDEX \`IDX_0ad4792ebd254550ad4fdb55d6\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`providerId\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`deletedAt\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`password\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`email\` varchar(255) NOT NULL`);
    }

}
