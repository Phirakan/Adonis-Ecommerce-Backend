import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Products extends BaseSchema {
  protected tableName = 'products'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.text('description').nullable()
      table.decimal('price', 12, 2).notNullable()
      table.integer('stock_quantity').notNullable()
      table.integer('category_id').unsigned().nullable().references('id').inTable('categories').onDelete('SET NULL')
      table.string('image_url').nullable()
      table.boolean('is_active').defaultTo(true)
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
