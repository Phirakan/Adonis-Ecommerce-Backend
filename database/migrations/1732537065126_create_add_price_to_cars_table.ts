import { BaseSchema } from '@adonisjs/lucid/schema'

export default class AddPriceToCars extends BaseSchema {
  protected tableName = 'cars'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('Price').notNullable().after('Year') 
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('Price') 
    })
  }
}
