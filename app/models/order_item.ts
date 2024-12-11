import { 
  column, 
  BaseModel, 
  belongsTo
} from '@adonisjs/lucid/orm'

// Import the correct types for relationships
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

// Import related models
import Order from './order.js'
import Product from './product.js'

export default class OrderItem extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare orderId: number

  @column()
  declare productId: number

  @column()
  declare quantity: number

  @column()
  declare priceAtTime: number

  // Define the relationship to the Order model
  @belongsTo(() => Order)
  declare order: BelongsTo<typeof Order>

  // Define the relationship to the Product model
  @belongsTo(() => Product)
  declare product: BelongsTo<typeof Product>
}
