import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class RemoveDeletedAt1634240882505 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('user', 'deletedAt');
    await queryRunner.dropColumn('tweet', 'deletedAt');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('user', new TableColumn({
      name: 'deletedAt',
      type: 'date',
      isNullable: true,
    }));
    await queryRunner.addColumn('tweet', new TableColumn({
      name: 'deletedAt',
      type: 'date',
      isNullable: true,
    }));
  }
}
