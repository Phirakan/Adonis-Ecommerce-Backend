import type { HasMany, BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import { 
  column, 
  BaseModel, 
  belongsTo,  // Corrected import for belongsTo
  hasMany 
} from '@adonisjs/lucid/orm'

// Import related models
import Cart from './cart.js'
import OrderItem from './order_item.js'
import ProductReview from './product_review.js'
import Category from './category.js'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare description: string | null

  @column()
  declare price: number

  @column()
  declare stockQuantity: number

  @column()
  declare categoryId: number 

  @column()
  declare imageUrl: string | null

  @column()
  declare isActive: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Category)
  declare category: BelongsTo<typeof Category> // Using BelongsTo relationship correctly

  @hasMany(() => Cart)
  declare carts: HasMany<typeof Cart>
 
  @hasMany(() => OrderItem)
  declare orderItems: HasMany<typeof OrderItem>

  @hasMany(() => ProductReview)
  declare reviews: HasMany<typeof ProductReview>
}
