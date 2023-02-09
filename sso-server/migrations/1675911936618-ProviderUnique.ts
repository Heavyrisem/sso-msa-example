import { MigrationInterface, QueryRunner } from "typeorm";

export class ProviderUnique1675911936618 implements MigrationInterface {
    name = 'ProviderUnique1675911936618'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_0ad4792ebd254550ad4fdb55d6\` (\`providerId\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP INDEX \`IDX_0ad4792ebd254550ad4fdb55d6\``);
    }

}
