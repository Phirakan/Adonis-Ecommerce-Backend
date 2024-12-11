import { DateTime } from 'luxon'
import { 
  column, 
  BaseModel, 
  belongsTo
} from '@adonisjs/lucid/orm'

// Import the required types
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

// Import the related models
import User from './user.js'
import Product from './product.js'

export default class Cart extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare productId: number

  @column()
  declare quantity: number

  @column.dateTime({ autoCreate: true })
  declare addedAt: DateTime

  // Define the BelongsTo relationship with User
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  // Define the BelongsTo relationship with Product
  @belongsTo(() => Product)
  declare product: BelongsTo<typeof Product>
}
