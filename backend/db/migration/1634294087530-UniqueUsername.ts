import { MigrationInterface, QueryRunner } from 'typeorm';

export default class UniqueUsername1634294087530 implements MigrationInterface {
    name = 'UniqueUsername1634294087530'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE "public"."user" DROP CONSTRAINT "UQ_065d4d8f3b5adb4a08841eae3c8"');
      await queryRunner.query('ALTER TABLE "public"."user" ADD CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username")');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE "public"."user" DROP CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb"');
      await queryRunner.query('ALTER TABLE "public"."user" ADD CONSTRAINT "UQ_065d4d8f3b5adb4a08841eae3c8" UNIQUE ("name")');
    }

}
