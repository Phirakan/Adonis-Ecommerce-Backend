/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

// import LoginController from '#controllers/auth/login_controller'
import AuthController from  '#controllers/auth_controller'
// import RegisterController from '#controllers/auth/register_controller'
import router from '@adonisjs/core/services/router'
import CarsController from '#controllers/cars_controller'
import UserController from '#controllers/users_controller'
import ProductController from '#controllers/products_controller'
import CategoryController from '#controllers/categories_controller'
import ProductReviewController from '#controllers/product_reviews_controller'
import CartController from '#controllers/carts_controller'
import OrderController from '#controllers/orders_controller'
import OrderItemController from '#controllers/order_items_controller'

import { middleware } from './kernel.js'

/*
|-------------------------------
| Home route
|-------------------------------
*/

router.get('/', async (ctx) => {

    await ctx.auth.check()

    return ctx.view.render('pages/home')
})


/*
|-------------------------------
| Cars Routes
|-------------------------------
*/
router.get('api/Cars', async (ctx) => {

    return new CarsController().index()
})

router.post('api/create', async (ctx) => {

    return new CarsController().create(ctx)
})

router.delete('api/delete/:id', async (ctx) => {

    return new CarsController().delete(ctx)
})

router.put('api/update/:id', async (ctx) => {
    
    return new CarsController().update(ctx)
  })

  /*
|-------------------------------
| User Profile Route
|-------------------------------
*/

  router.get('/api/user/profile', async (ctx) => {
    return new UserController().getProfile(ctx)
  })

/*
|-------------------------------
| Product Routes
|-------------------------------
*/

  router.get('/api/products', async (ctx) => {
    return new ProductController().index(ctx)
})

router.get('/api/products/:id', async (ctx) => {
    return new ProductController().show(ctx)
})

router.post('/api/products', async (ctx) => {
    return new ProductController().store(ctx)
})

router.put('/api/products/:id', async (ctx) => {
    return new ProductController().update(ctx)
})

router.delete('/api/products/:id', async (ctx) => {
    return new ProductController().destroy(ctx)
})

/*
|-------------------------------
| Category Routes
|-------------------------------
*/

router.get('api/categories', async (ctx) => {
    return new CategoryController().index(ctx)
  })
  
  router.get('api/categories/:id', async (ctx) => {
    return new CategoryController().show(ctx)
  })
  
  router.post('api/categories', async (ctx) => {
    return new CategoryController().store(ctx)
  })
  
  router.put('api/categories/:id', async (ctx) => {
    return new CategoryController().update(ctx)
  })
  
  router.delete('api/categories/:id', async (ctx) => {
    return new CategoryController().destroy(ctx)
  })



/*
|-------------------------------
| Authentication Routes
|-------------------------------
*/
router
    .group(() => {

      router.post('/api/register', [AuthController, 'register']).as('auth.register')
      router.post('/api/login', [AuthController, 'login']).as('auth.login')

     router.delete('/api/logout', [AuthController, 'logout']).as('auth.logout').use(middleware.auth())
     router.get('/api/me', [AuthController, 'me']).as('auth.me')

})
    .as('auth')





    /*
|-------------------------------
| Product Review Routes
|-------------------------------
*/
    router.group(() => {
        // Get all reviews for a specific product
        router.get('products/:productId/reviews', [ProductReviewController, 'index'])
      
        // Create a new review for a product
        router.post('reviews', [ProductReviewController, 'store'])
      
        // Get a single review by ID
        router.get('reviews/:id', [ProductReviewController, 'show'])
      
        // Update an existing review
        router.put('reviews/:id', [ProductReviewController, 'update'])
      
        // Delete a review
        router.delete('reviews/:id', [ProductReviewController, 'destroy'])
      }).prefix('api')



             /*
            |-------------------------------
            | Product Review Routes
            |-------------------------------
            */

      router.group(() => {
        // Get all products in the cart for the authenticated user
        router.get('/cart', [CartController, 'index'])
      
        // Add a product to the cart
        router.post('/cart', [CartController, 'store'])
    
      
        // Remove a product from the cart
        router.delete('/cart/:id', [CartController, 'destroy'])
      }).prefix('api')

      

      router.group(() => {
        router.post('orders', [OrderController, 'store']) // Create order
        router.get('orders', [OrderController, 'index']) // Get all orders
        router.get('orders/:id', [OrderController, 'show']) // Get single order
        router.put('orders/:id', [OrderController, 'update']) // Update order
        router.delete('orders/:id', [OrderController, 'destroy']) // Delete order
      
        router.post('order-items', [OrderItemController, 'store']) // Create order item
        router.get('order-items/:orderId', [OrderItemController, 'index']) // Get order items by orderId
        router.get('order-items/:id', [OrderItemController, 'show']) // Get single order item
        router.put('order-items/:id', [OrderItemController, 'update']) // Update order item
        router.delete('order-items/:id', [OrderItemController, 'destroy']) // Delete order item
      }).prefix('api')
      