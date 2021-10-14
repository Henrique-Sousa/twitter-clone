import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';
import bcrypt from 'bcryptjs';

export default class AddUserPassword1634207126008 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    const password: string = await bcrypt.hash('12345678', 10);
    await queryRunner.addColumn('user', new TableColumn({
      name: 'password',
      type: 'varchar(128)',
      default: `'${password}'`,
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('user', 'password');
  }

}
