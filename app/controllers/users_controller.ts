import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UserController {
  public async getProfile({ response, auth }: HttpContext) {
    try {
      // Check if the authenticated user is an admin
      const authUser = await auth.authenticate()
      
      // Validate that the authenticated user has an admin role
      if (authUser.role !== 'admin') {
        return response.status(403).json({
          success: false,
          message: 'Access denied. Administrator privileges required.',
        })
      }

      // If user is admin, fetch all users
      const users = await User.query().select('id', 'email', 'fullName', 'role')
      
      return response.json({
        success: true,
        users,
      })
    } catch (error) {
      console.error('Error fetching users:', error)
      
      // Handle different types of errors
      if (error.code === 'E_UNAUTHORIZED_ACCESS') {
        return response.status(401).json({
          success: false,
          message: 'Authentication required',
        })
      }
      
      return response.status(500).json({
        success: false,
        message: 'Internal Server Error',
      })
    }
  }
}