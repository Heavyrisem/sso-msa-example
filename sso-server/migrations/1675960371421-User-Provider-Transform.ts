import { MigrationInterface, QueryRunner } from "typeorm";

export class UserProviderTransform1675960371421 implements MigrationInterface {
    name = 'UserProviderTransform1675960371421'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`provider\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`provider\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`provider\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`provider\` char(1) NOT NULL`);
    }

}
