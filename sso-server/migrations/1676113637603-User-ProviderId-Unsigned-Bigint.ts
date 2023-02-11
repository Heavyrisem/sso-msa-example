import { MigrationInterface, QueryRunner } from "typeorm";

export class UserProviderIdUnsignedBigint1676113637603 implements MigrationInterface {
    name = 'UserProviderIdUnsignedBigint1676113637603'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_0ad4792ebd254550ad4fdb55d6\` ON \`user\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`profileImage\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`providerId\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`providerId\` bigint UNSIGNED NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_0ad4792ebd254550ad4fdb55d6\` (\`providerId\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP INDEX \`IDX_0ad4792ebd254550ad4fdb55d6\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`providerId\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`providerId\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`profileImage\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_0ad4792ebd254550ad4fdb55d6\` ON \`user\` (\`providerId\`)`);
    }

}
