import { BaseSchema } from '@adonisjs/lucid/schema'

export default class OrderItems extends BaseSchema {
  protected tableName = 'order_items'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('order_id').unsigned().notNullable().references('id').inTable('orders').onDelete('CASCADE')
      table.integer('product_id').unsigned().notNullable().references('id').inTable('products').onDelete('CASCADE')
      table.integer('quantity').notNullable()
      table.decimal('price_at_time', 12, 2).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
