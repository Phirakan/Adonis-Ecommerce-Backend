import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'car_images'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id') // สร้างคอลัมน์ id แบบ Auto Increment

      // สร้างคอลัมน์ car_id ที่เป็น Foreign Key ชี้ไปยัง car table
      table
        .bigInteger('car_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('cars') // ชี้ไปยังตาราง 'cars'
        .onDelete('CASCADE') // เมื่อมีการลบ car จะลบภาพที่เกี่ยวข้องด้วย

      // สร้างคอลัมน์ image_url ที่เก็บ URL ของภาพ
      table.string('image_url').notNullable()

      table.timestamp('created_at').defaultTo(this.now())
      table.timestamp('updated_at').defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
