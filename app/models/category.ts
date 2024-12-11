import { DateTime } from 'luxon'
import { 
  column, 
  BaseModel, 
  hasMany, 
  belongsTo
} from '@adonisjs/lucid/orm'

// Import the required types
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'

// Import the related models
import Product from './product.js'


export default class Category extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare categoryName: string

  @column()
  declare description: string | null

  @column()
  declare parentCategoryId: number | null

  // Relationship to Product
  @hasMany(() => Product)
  declare products: HasMany<typeof Product>

  // Self-relationship (parent category)
  @belongsTo(() => Category, {
    foreignKey: 'parentCategoryId'
  })
  declare parentCategory: BelongsTo<typeof Category>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
