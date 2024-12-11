import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Categories extends BaseSchema {
  protected tableName = 'categories'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('category_name', 100).notNullable()
      table.text('description').nullable()
      table.integer('parent_category_id').unsigned().nullable().references('id').inTable('categories').onDelete('SET NULL')
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).nullable() // อนุญาตให้เป็น NULL
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
