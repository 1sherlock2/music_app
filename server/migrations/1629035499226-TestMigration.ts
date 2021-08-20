import { MigrationInterface, QueryRunner } from 'typeorm';

export class TestMigration1629035499226 implements MigrationInterface {
  name = 'TestMigration1629035499226';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."track" DROP COLUMN "audio"`);
    await queryRunner.query(
      `ALTER TABLE "public"."track" ADD "audio" character varying NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."track" ALTER COLUMN "artist" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."track" ALTER COLUMN "img" SET NOT NULL`
    );
    await queryRunner.query(`ALTER TABLE "public"."track" DROP COLUMN "audio"`);
    await queryRunner.query(
      `ALTER TABLE "public"."track" ADD "audio" boolean NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."track" DROP COLUMN "audio"`);
    await queryRunner.query(
      `ALTER TABLE "public"."track" ADD "audio" character varying NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."track" ALTER COLUMN "img" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."track" ALTER COLUMN "artist" DROP NOT NULL`
    );
    await queryRunner.query(`ALTER TABLE "public"."track" DROP COLUMN "audio"`);
    await queryRunner.query(
      `ALTER TABLE "public"."track" ADD "audio" boolean NOT NULL`
    );
  }
}
