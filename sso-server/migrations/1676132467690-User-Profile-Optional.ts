import { MigrationInterface, QueryRunner } from "typeorm";

export class UserProfileOptional1676132467690 implements MigrationInterface {
    name = 'UserProfileOptional1676132467690'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_0ad4792ebd254550ad4fdb55d6\` ON \`user\``);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`profileImage\` \`profileImage\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_0ad4792ebd254550ad4fdb55d6\` (\`providerId\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP INDEX \`IDX_0ad4792ebd254550ad4fdb55d6\``);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`profileImage\` \`profileImage\` varchar(255) NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_0ad4792ebd254550ad4fdb55d6\` ON \`user\` (\`providerId\`)`);
    }

}
