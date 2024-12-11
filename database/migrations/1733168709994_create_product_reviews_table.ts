import { BaseSchema } from '@adonisjs/lucid/schema'

export default class ProductReviews extends BaseSchema {
  protected tableName = 'product_reviews'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('product_id').unsigned().notNullable().references('id').inTable('products').onDelete('CASCADE')
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE')
      table.integer('rating').notNullable()
      table.text('review_text').nullable()
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
