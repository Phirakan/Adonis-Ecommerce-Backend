import User from '#models/user';
import { loginValidator } from '#validators/auth';
import type { HttpContext } from '@adonisjs/core/http';

export default class LoginController {
  async store({ request, response, auth }: HttpContext) {
    try {
      // ตรวจสอบข้อมูลที่ได้รับจากการ validate
      const { email, password } = await request.validateUsing(loginValidator);
      console.log('Received login request with email:', email);

      // ตรวจสอบผู้ใช้ในฐานข้อมูล
      const user = await User.verifyCredentials(email, password);
      console.log('User authenticated:', user.id);

      // ทำการ login ผู้ใช้
      await auth.use('web').login(user);
      console.log('User logged in successfully:', user.id);


      // ตรวจสอบ role ของผู้ใช้
      const isAdmin = user.role === 'admin';
      const isCustomer = user.role === 'customer';

      // ส่งข้อมูลผู้ใช้
      return response.json({
        success: true,
        message: 'Login successful',
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          role: user.role, // รวม role ใน response
        },
        isAdmin, // ส่งค่าเป็น boolean
        isCustomer,
      });
    } catch (error) {
      console.log('Login failed:', error.message); // แสดงข้อผิดพลาดใน console
      return response.status(400).json({
        success: false,
        message: 'Invalid email or password',
      });
    }
  }
}
