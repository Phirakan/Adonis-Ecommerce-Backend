import User from '#models/user';
import { registerValidator } from '#validators/auth';
import type { HttpContext } from '@adonisjs/core/http';

export default class RegisterController {
  async store({ request, response, auth }: HttpContext) {
    try {
      // Validate Input Data
      const data = await request.validateUsing(registerValidator);

      // ตรวจสอบ role และตั้งค่าให้ผู้ใช้
      const role = data.role === 'admin' ? 'admin' : 'customer'; // ถ้าไม่มีค่า role หรือค่าไม่ถูกต้องให้เป็น 'customer'

      // สร้างผู้ใช้ใหม่
      const user = await User.create({
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        role, // เก็บ role ที่เลือก
      });

      // Auto-login user (optional)
      await auth.use('web').login(user);

      // Return success response
      return response.json({
        success: true,
        message: 'Registration successful',
        user: { id: user.id, email: user.email, fullName: user.fullName, role: user.role },
      });
    } catch (error) {
      console.error('Registration error:', error);

      // Return error response
      return response.status(400).json({
        success: false,
        message: error.message || 'Registration failed',
        errors: error.messages || {},
      });
    }
  }
}
