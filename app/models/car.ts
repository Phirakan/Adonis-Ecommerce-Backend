import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Car extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  public Brand: string | undefined

  @column()
  public Model: string | undefined

  @column()
  public Year: number | undefined

  @column()
  public Price: number | undefined

  @column()
  public image_url: string | undefined 
  
  @column() // เพิ่มฟิลด์ status
  public status: string | undefined

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime | undefined

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime | undefined
}
