// import type { HttpContext } from '@adonisjs/core/http'
// import type { NextFn } from '@adonisjs/core/types/http'
// import type { Authenticators } from '@adonisjs/auth/types'

// /**
//  * Auth middleware is used authenticate HTTP requests and deny
//  * access to unauthenticated users.
//  */
// export default class AuthMiddleware {
//   /**
//    * The URL to redirect to, when authentication fails
//    */
//   redirectTo = '/login'
//   async handle(
//     ctx: HttpContext,
//     next: NextFn,
//     options: {
//       guards?: (keyof Authenticators)[]
//     } = {}
//   ) {
//     const token = ctx.request.headers("Authorization")
//     if(ctx.auth.isAuthenticated){
//       return next()
//     }else{
//       ctx.response.redirect('/login')
//     }
//     // await ctx.auth.authenticateUsing(options.guards, { loginRoute: this.redirectTo })
//     // return next()
//   }
// }