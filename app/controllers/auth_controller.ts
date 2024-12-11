import User from '#models/user'
import { loginValidator, registerValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async register({ request, response }: HttpContext) {
    const data = await request.validateUsing(registerValidator)
    const user = await User.create(data)

    // ตรวจสอบ role ของผู้ใช้
    const isAdmin = user.role === 'admin'
    const isCustomer = user.role === 'customer'

    // สร้าง API token
    const token = await User.accessTokens.create(user)

    // ส่งข้อมูลผู้ใช้และ token
    return response.json({
      message: 'User registered successfully',
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        isAdmin,
        isCustomer,
        token,
      },
    
    })
  }

  async login({ request, response }: HttpContext) {
   try{
    const { email, password } = await request.validateUsing(loginValidator)

    const user = await User.verifyCredentials(email, password)

    // ตรวจสอบ role ของผู้ใช้
    const isAdmin = user.role === 'admin'
    const isCustomer = user.role === 'customer'

    // สร้าง API token
    const token = await User.accessTokens.create(user)

    console.log(token)

    // ส่งข้อมูลผู้ใช้และ token
    return response.json({
      message: 'Login successful',
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        isAdmin,
        isCustomer,
        token,
      },
     
    })
   }catch(error){
     return response.badRequest('Invalid email or password')
   }
  }

  async logout({ auth, response }: HttpContext) {
    const user = auth.user! as User
    
    // ลบ token ของผู้ใช้
    await User.accessTokens.delete(user, user.currentAccessToken.identifier)

    return response.json({
      message: 'Logout successful',
    })
  }

  async me({ auth, response }: HttpContext) {
    await auth.check()

    const user = auth.user! as User
    
    // ตรวจสอบ role ของผู้ใช้
    const isAdmin = user.role === 'admin'
    const isCustomer = user.role === 'customer'

    // ส่งข้อมูลผู้ใช้เป็น JSON
    return response.json({
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        isAdmin,
        isCustomer,
      },
    })
  }
}
