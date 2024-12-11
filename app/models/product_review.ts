import { DateTime } from 'luxon'
import { 
  column, 
  BaseModel, 
  belongsTo 
} from '@adonisjs/lucid/orm'

import Product from './product.js'
import User from './user.js'

// Import the BelongsTo type for correct typing
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class ProductReview extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare productId: number

  @column()
  declare userId: number

  @column()
  declare rating: number

  @column()
  declare reviewText: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @belongsTo(() => Product)
  declare product: BelongsTo<typeof Product>

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
