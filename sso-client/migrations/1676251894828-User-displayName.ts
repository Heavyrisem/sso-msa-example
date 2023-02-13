import { MigrationInterface, QueryRunner } from "typeorm";

export class UserDisplayName1676251894828 implements MigrationInterface {
    name = 'UserDisplayName1676251894828'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`displayName\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`displayName\``);
    }

}
