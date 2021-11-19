import { MigrationInterface, QueryRunner } from 'typeorm';

export default class SnakeCaseColumnNames1637322625343 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE "public"."user" RENAME COLUMN "id" TO "user_id"');
      await queryRunner.query('ALTER TABLE "public"."user" RENAME COLUMN "photoUrl" TO "photo_url"');
      await queryRunner.query('ALTER TABLE "public"."user" RENAME COLUMN "createdAt" TO "created_at"');

      await queryRunner.query('ALTER TABLE "public"."tweet" RENAME COLUMN "id" TO "tweet_id"');
      await queryRunner.query('ALTER TABLE "public"."tweet" RENAME COLUMN "createdAt" TO "created_at"');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE "public"."user" RENAME COLUMN "user_id" TO "id"');
      await queryRunner.query('ALTER TABLE "public"."user" RENAME COLUMN "photo_url" TO "photoUrl"');
      await queryRunner.query('ALTER TABLE "public"."user" RENAME COLUMN "created_at" TO "createdAt"');

      await queryRunner.query('ALTER TABLE "public"."tweet" RENAME COLUMN "tweet_id" TO "id"');
      await queryRunner.query('ALTER TABLE "public"."tweet" RENAME COLUMN "created_at" TO "createdAt"');
    }
}
