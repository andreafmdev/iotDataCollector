import { MigrationInterface, QueryRunner } from "typeorm";

export class PostgreMigration1721203447283 implements MigrationInterface {
    name = 'PostgreMigration1721203447283'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "verification_token" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "users" ADD "verified_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "users" ADD "password_reset_token" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "users" ADD "password_reset_expires" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "users" ADD "last_login_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "password" TYPE character varying(255)`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."password" IS 'password'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "users"."password" IS 'password'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "password" TYPE character varying(100)`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "last_login_at"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password_reset_expires"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password_reset_token"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "verified_at"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "verification_token"`);
    }
}
