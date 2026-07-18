import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDateOfBithToUsers1784392987868 implements MigrationInterface {
    name = 'AddDateOfBithToUsers1784392987868'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "dateOfBirth" TIMESTAMP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "dateOfBirth"`);
    }

}
