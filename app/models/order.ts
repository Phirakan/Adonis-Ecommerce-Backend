import { DateTime } from 'luxon'
import { 
  column, 
  BaseModel, 
  belongsTo, 
  hasMany
} from '@adonisjs/lucid/orm'

// Import the correct types for relationships
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'

// Import related models
import User from './user.js'
import OrderItem from './order_item.js'

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare totalAmount: number

  @column()
  declare orderStatus: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'

  @column()
  declare shippingAddress: string

  @column()
  declare billingAddress: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Define the relationship to the User model
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  // Define the relationship to the OrderItem model
  @hasMany(() => OrderItem)
  declare orderItems: HasMany<typeof OrderItem>
}
