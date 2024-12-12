import { BaseSchema } from '@adonisjs/lucid/schema'

export default class AddTrackingInfoToOrders extends BaseSchema {
  protected tableName = 'orders'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('trackingNumber').nullable()  // เพิ่มคอลัมน์ trackingNumber
      table.string('courierName').nullable()     // เพิ่มคอลัมน์ courierName
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('trackingNumber')  // ลบคอลัมน์ trackingNumber
      table.dropColumn('courierName')     // ลบคอลัมน์ courierName
    })
  }
}
