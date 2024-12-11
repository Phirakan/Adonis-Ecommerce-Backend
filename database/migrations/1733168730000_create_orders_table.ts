import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Orders extends BaseSchema {
  protected tableName = 'orders'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').unsigned().primary();
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE')
      table.decimal('total_amount', 12, 2).notNullable()
      table.enum('order_status', ['pending', 'processing', 'shipped', 'delivered', 'cancelled']).notNullable().defaultTo('pending')
      table.text('shipping_address').notNullable()
      table.text('billing_address').notNullable()
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
