/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
*/

import AuthController from  '#controllers/auth_controller'
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
import TestapisController from '#controllers/testapis_controller'

// Home route
router.get('/', async (ctx) => {
    await ctx.auth.check()
    return ctx.view.render('pages/home')
})

// Cars Routes
router.get('api/v1/Cars', async (ctx) => {
    return new CarsController().index()
})

router.post('api/v1/create', async (ctx) => {
    return new CarsController().create(ctx)
})

router.delete('api/v1/delete/:id', async (ctx) => {
    return new CarsController().delete(ctx)
})

router.put('api/v1/update/:id', async (ctx) => {
    return new CarsController().update(ctx)
})

// User Profile Route
router.get('/api/v1/user/profile', async (ctx) => {
    return new UserController().getProfile(ctx)
})

// Product Routes
router.get('/api/v1/products', async (ctx) => {
    return new ProductController().index(ctx)
})

router.get('/api/v1/products/:id', async (ctx) => {
    return new ProductController().show(ctx)
})

router.post('/api/v1/products', async (ctx) => {
    return new ProductController().store(ctx)
})

router.put('/api/v1/products/:id', async (ctx) => {
    return new ProductController().update(ctx)
})

router.delete('/api/v1/products/:id', async (ctx) => {
    return new ProductController().destroy(ctx)
})

// Category Routes
router.get('api/v1/categories', async (ctx) => {
    return new CategoryController().index(ctx)
})

router.get('api/v1/categories/:id', async (ctx) => {
    return new CategoryController().show(ctx)
})

router.post('api/v1/categories', async (ctx) => {
    return new CategoryController().store(ctx)
})

router.put('api/v1/categories/:id', async (ctx) => {
    return new CategoryController().update(ctx)
})

router.delete('api/v1/categories/:id', async (ctx) => {
    return new CategoryController().destroy(ctx)
})

// Authentication Routes
router
    .group(() => {
      router.post('/register', [AuthController, 'register']).as('register')
      router.post('/login', [AuthController, 'login']).as('login')
      router.delete('/logout', [AuthController, 'logout']).as('logout')
      router.get('/me', [AuthController, 'me']).as('me')
    })
    .prefix('api/v1')
    .as('auth') // Now this will prefix all route names with 'auth.'

// Product Review Routes
router.group(() => {
    router.get('products/:productId/reviews', [ProductReviewController, 'index'])
    router.post('reviews', [ProductReviewController, 'store'])
    router.get('reviews/:id', [ProductReviewController, 'show'])
    router.put('reviews/:id', [ProductReviewController, 'update'])
    router.delete('reviews/:id', [ProductReviewController, 'destroy'])
}).prefix('api/v1')

// Cart Routes with Auth Middleware
router.group(() => {
    router.get('/cart', [CartController, 'index'])
    router.post('/cart', [CartController, 'store'])
    router.put('/cart/:id',[CartController, 'update'])
    router.delete('/cart/:id', [CartController, 'destroy'])
})
.prefix('api/v1')
.use(middleware.auth({
  
  })) // Added auth middleware only for cart routes

// Order Routes
router.group(() => {
    router.post('orders', [OrderController, 'store'])
    router.get('orders', [OrderController, 'index'])
    router.get('orders/:id', [OrderController, 'show'])
    router.put('orders/:id', [OrderController, 'update'])
    router.delete('orders/:id', [OrderController, 'destroy'])
    router.get('orders-history', [OrderController, 'orderHistory'])

    router.post('order-items', [OrderItemController, 'store'])
    router.get('order-items/:orderId', [OrderItemController, 'index'])
    router.get('order-items/:id', [OrderItemController, 'show'])
    router.put('order-items/:id', [OrderItemController, 'update'])
    router.delete('order-items/:id', [OrderItemController, 'destroy'])
}).prefix('api/v1')

// TestapisController
router.group(() => {
  router.get('testapi', [TestapisController, 'index'])
}).prefix('api/v1').use(middleware.auth())