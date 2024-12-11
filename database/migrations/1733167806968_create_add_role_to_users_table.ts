import { BaseSchema } from '@adonisjs/lucid/schema'

export default class AddRoleToUsersTable extends BaseSchema {
  protected tableName = 'users';

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('role', 50).notNullable().defaultTo('customer'); // เพิ่มคอลัมน์ role
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('role'); // ลบคอลัมน์ role หาก rollback
    });
  }
}
