import { MigrationInterface, QueryRunner } from "typeorm";

export class UserProviderTransform1675960300535 implements MigrationInterface {
    name = 'UserProviderTransform1675960300535'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`provider\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`provider\` char NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`provider\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`provider\` int NOT NULL`);
    }

}
