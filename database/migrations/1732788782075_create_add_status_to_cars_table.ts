import { BaseSchema } from '@adonisjs/lucid/schema'

export default class AddStatusToCars extends BaseSchema {
  protected tableName = 'cars'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('status').defaultTo('available') // เพิ่มฟิลด์ status พร้อมค่าเริ่มต้น
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('status') // ลบฟิลด์ status หาก rollback
    })
  }
}
