import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class RemoveDeletedAt1634240882505 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('user', 'deletedAt');
    await queryRunner.dropColumn('tweet', 'deletedAt');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query('ALTER TABLE "public"."user" ADD "deletedAt" date DEFAULT null');
    // await queryRunner.query('ALTER TABLE "public"."tweet" ADD "deletedAt" date DEFAULT null');
    await queryRunner.addColumn('user', new TableColumn({
      name: 'deletedAt',
      type: 'date',
      isNullable: true,
      default: null,
    }));
    await queryRunner.addColumn('tweet', new TableColumn({
      name: 'deletedAt',
      type: 'date',
      isNullable: true,
      default: null,
    }));
  }
}
