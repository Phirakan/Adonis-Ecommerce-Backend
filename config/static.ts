const staticConfig = {
  enabled: true,
  dotFiles: 'ignore', // ไม่เสิร์ฟไฟล์ที่ขึ้นต้นด้วย "."
  etag: true, // เปิดใช้งาน ETag
  maxAge: 0, // อายุของไฟล์แคช (หน่วยเป็นวินาที)
  root: 'public', // เส้นทางโฟลเดอร์
}

export default staticConfig
