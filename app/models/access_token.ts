import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

// Define interface for token creation options
export interface TokenCreateOptions {
  name?: string
  expiresIn?: string | number
  abilities?: string[]
}

export default class AccessTokens extends BaseModel {

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare tokenableId: number

  @column()
  declare type: string

  @column()
  declare name: string | null

  @column()
  declare hash: string

  @column()
  declare abilities: string[]

  @column.dateTime()
  declare lastUsedAt: DateTime | null

  @column.dateTime()
  declare expiresAt: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Helper method to create token with proper typing
  static async createToken(user: any, options: TokenCreateOptions) {
    const token = await this.create({
      tokenableId: user.id,
      type: 'api',
      name: options.name || null,
      abilities: options.abilities || ['*'],
      expiresAt: options.expiresIn 
        ? DateTime.now().plus({ days: typeof options.expiresIn === 'string' 
            ? parseInt(options.expiresIn) 
            : options.expiresIn }) 
        : null
    })
    return token
  }
}