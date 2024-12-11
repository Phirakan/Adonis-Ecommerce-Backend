import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import type { Authenticators } from '@adonisjs/auth/types'

/**
 * Auth middleware to authenticate HTTP requests and deny
 * access to unauthenticated users.
 */
export default class AuthJWTMiddleware {
  /**
   * The URL to redirect to, when authentication fails
   */
  redirectTo = 'api/v1/login'

  async handle(
    ctx: HttpContext, // ตัวแปร context ของ HTTP Request/Response
    next: NextFn, // ฟังก์ชันที่ใช้เรียก middleware ถัดไป
    options: {
      guards?: (keyof Authenticators)[] // กำหนด guards ถ้ามีการใช้งานหลาย guards
    } = {}
  ) {
    const guards = options.guards || ['api'] // ใช้ guard เริ่มต้นเป็น 'api' หากไม่มี guard ที่ระบุมา

    try {
      // พยายามตรวจสอบสิทธิ์โดยใช้ guards ที่ระบุไว้
      for (const guard of guards) {
        const isAuthenticated = await (ctx.auth.use(guard) as any).check()
        if (isAuthenticated) {
          // ถ้าผู้ใช้งานได้รับการตรวจสอบสิทธิ์สำเร็จ ให้ไปยัง middleware ถัดไป
          return next()
        }
      }
    } catch (error) {
      // จัดการข้อผิดพลาดที่อาจเกิดขึ้นระหว่างการตรวจสอบสิทธิ์
      console.error('ข้อผิดพลาดในการตรวจสอบสิทธิ์:', error)
    }

    // หากการตรวจสอบสิทธิ์ล้มเหลว ให้ตอบกลับด้วยสถานะ 401 (Unauthorized)
    ctx.response.status(401).json({
      message: 'Unauthorized access. Please log in to continue.', // แจ้งข้อความว่าผู้ใช้ไม่มีสิทธิ์
    })
  }
}