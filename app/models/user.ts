import type { HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { 
  column, 
  BaseModel, 
  hasMany
} from '@adonisjs/lucid/orm'
import { compose } from '@adonisjs/core/helpers'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import Cart from './cart.js'
import Order from './order.js'
import ProductReview from './product_review.js'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'


const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
    currentAccessToken: any

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare fullName: string | null

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

   @column()
  declare role: 'admin' | 'customer'

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @hasMany(() => Cart)
  declare carts: HasMany<typeof Cart>

  @hasMany(() => Order)
  declare orders: HasMany<typeof Order>

  @hasMany(() => ProductReview)
  declare reviews: HasMany<typeof ProductReview>

  static accessTokens = DbAccessTokensProvider.forModel(User)


}