import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserProfile1786292669473 implements MigrationInterface {
    name = 'CreateUserProfile1786292669473'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_profiles" ("id" SERIAL NOT NULL, 
            "authUserId" integer NOT NULL,
             "email" character varying NOT NULL, 
             "firstName" character varying(100),
              "lastName" character varying(100),
               "phone" character varying(20),
               "avatar" character varying(255),
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(), 
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1ec6662219f4605723f1e41b6cb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_3a31e0a315109d8f5fbadbb933" ON "user_profiles"  ("authUserId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_3a31e0a315109d8f5fbadbb933"`);
        await queryRunner.query(`DROP TABLE "user_profiles"`);
    }

}
