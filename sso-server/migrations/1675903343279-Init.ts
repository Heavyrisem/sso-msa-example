import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1675903343279 implements MigrationInterface {
    name = 'Init1675903343279'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, \`email\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`providerId\` varchar(255) NOT NULL, \`provider\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
