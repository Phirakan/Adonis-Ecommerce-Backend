import { BaseSchema } from '@adonisjs/lucid/schema'

export default class AddImageUrlToCars extends BaseSchema {
  protected tableName = 'cars'

  public async up () {
    // เพิ่ม column 'image_url' เพื่อเก็บ URL หรือชื่อไฟล์ของรูปภาพ
    this.schema.table(this.tableName, (table) => {
      table.string('image_url').nullable()  // ใช้ nullable ถ้าคุณต้องการให้ไม่บังคับกรอก
    })
  }

  public async down () {
    // ลบ column 'image_url' ถ้าต้องการ rollback migration
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('image_url')
    })
  }
}
