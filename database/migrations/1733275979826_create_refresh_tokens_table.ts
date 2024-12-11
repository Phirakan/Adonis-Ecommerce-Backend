import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'refresh_tokens'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary() // ID สำหรับแต่ละ refreshToken
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE') // เชื่อมโยงกับ users
      table.string('token').notNullable() // เก็บ refreshToken
      table.timestamp('expires_at').notNullable() // เวลาหมดอายุของ refreshToken
      table.boolean('revoked').defaultTo(false) // ใช้ระบุว่า refreshToken ถูกยกเลิกแล้วหรือไม่
      table.timestamps() // timestamps สำหรับ created_at และ updated_at
    })
  }

  async down() {
    this.schema.dropTable(this.tableName) // ลบตาราง refresh_tokens หากไม่ต้องการใช้
  }
}
