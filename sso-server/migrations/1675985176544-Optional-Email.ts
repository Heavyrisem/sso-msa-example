import { MigrationInterface, QueryRunner } from "typeorm";

export class OptionalEmail1675985176544 implements MigrationInterface {
    name = 'OptionalEmail1675985176544'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`email\` \`email\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`email\` \`email\` varchar(255) NOT NULL`);
    }

}
