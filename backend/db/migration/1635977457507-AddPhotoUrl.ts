import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddPhotoUrl1635977457507 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('user', new TableColumn({
      name: 'photoUrl',
      type: 'varchar(255)',
      isNullable: true,
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('user', 'photoUrl');
  }
}
