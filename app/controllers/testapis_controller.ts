import type { HttpContext } from '@adonisjs/core/http'

export default class TestapisController {
  async index({ response, request, auth }: HttpContext) {
    try {
      // Ensure user is authenticated
      // await auth.authenticate()

      // if (auth.user) {
      //   return response.status(200).json({
      //     message: 'You are authenticated',
      //     user: auth.user
      //   })
      // }else{
      //   return response.status(401).json({
      //     message: 'You are not authenticated'
      //   })
      // }
      return response.status(200).json({
        message: 'You are authenticated',
        data: {
          detail : 'This is a test api',
          user: auth.authenticate()
        }
      })
      
    } catch (error) {
      return response.status(500).json({
        message: 'Internal server error',
        error: error.message
      })
    }
  }
}