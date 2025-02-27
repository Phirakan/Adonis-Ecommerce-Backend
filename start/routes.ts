/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

// Home route
router.get('/', async (ctx) => {
  await ctx.auth.check()
  return ctx.view.render('pages/home')
})

// Cars Routes
router.get('api/v1/Cars', async (ctx) => {
  const { default: CarsController } = await import('#controllers/cars_controller')
  return new CarsController().index()
})

router.post('api/v1/create', async (ctx) => {
  const { default: CarsController } = await import('#controllers/cars_controller')
  return new CarsController().create(ctx)
})

router.delete('api/v1/delete/:id', async (ctx) => {
  const { default: CarsController } = await import('#controllers/cars_controller')
  return new CarsController().delete(ctx)
})

router.put('api/v1/update/:id', async (ctx) => {
  const { default: CarsController } = await import('#controllers/cars_controller')
  return new CarsController().update(ctx)
})

// User Profile Route
router.get('/api/v1/user/profile', async (ctx) => {
  const { default: UserController } = await import('#controllers/users_controller')
  return new UserController().getProfile(ctx)
})

// Product Routes
router.get('/api/v1/products', async (ctx) => {
  const { default: ProductController } = await import('#controllers/products_controller')
  return new ProductController().index(ctx)
})

router.get('/api/v1/products/:id', async (ctx) => {
  const { default: ProductController } = await import('#controllers/products_controller')
  return new ProductController().show(ctx)
})

router.post('/api/v1/products', async (ctx) => {
  const { default: ProductController } = await import('#controllers/products_controller')
  return new ProductController().store(ctx)
})

router.put('/api/v1/products/:id', async (ctx) => {
  const { default: ProductController } = await import('#controllers/products_controller')
  return new ProductController().update(ctx)
})

router.delete('/api/v1/products/:id', async (ctx) => {
  const { default: ProductController } = await import('#controllers/products_controller')
  return new ProductController().destroy(ctx)
})

// Category Routes
router.get('api/v1/categories', async (ctx) => {
  const { default: CategoryController } = await import('#controllers/categories_controller')
  return new CategoryController().index(ctx)
})

router.get('api/v1/categories/:id', async (ctx) => {
  const { default: CategoryController } = await import('#controllers/categories_controller')
  return new CategoryController().show(ctx)
})

router.post('api/v1/categories', async (ctx) => {
  const { default: CategoryController } = await import('#controllers/categories_controller')
  return new CategoryController().store(ctx)
})

router.put('api/v1/categories/:id', async (ctx) => {
  const { default: CategoryController } = await import('#controllers/categories_controller')
  return new CategoryController().update(ctx)
})

router.delete('api/v1/categories/:id', async (ctx) => {
  const { default: CategoryController } = await import('#controllers/categories_controller')
  return new CategoryController().destroy(ctx)
})

// Authentication Routes
router
  .group(() => {
    router
      .post('/register', async (ctx) => {
        const { default: AuthController } = await import('#controllers/auth_controller')
        return new AuthController().register(ctx)
      })
      .as('register')

    router
      .post('/login', async (ctx) => {
        const { default: AuthController } = await import('#controllers/auth_controller')
        return new AuthController().login(ctx)
      })
      .as('login')

    router
      .delete('/logout', async (ctx) => {
        const { default: AuthController } = await import('#controllers/auth_controller')
        return new AuthController().logout(ctx)
      })
      .as('logout')

    router
      .get('/me', async (ctx) => {
        const { default: AuthController } = await import('#controllers/auth_controller')
        return new AuthController().me(ctx)
      })
      .as('me')
  })
  .prefix('api/v1')
  .as('auth') // Now this will prefix all route names with 'auth.'

// Product Review Routes
router
  .group(() => {
    router.get('products/:productId/reviews', async (ctx) => {
      const { default: ProductReviewController } = await import(
        '#controllers/product_reviews_controller'
      )
      return new ProductReviewController().index(ctx)
    })

    router.post('reviews', async (ctx) => {
      const { default: ProductReviewController } = await import(
        '#controllers/product_reviews_controller'
      )
      return new ProductReviewController().store(ctx)
    })

    router.get('reviews/:id', async (ctx) => {
      const { default: ProductReviewController } = await import(
        '#controllers/product_reviews_controller'
      )
      return new ProductReviewController().show(ctx)
    })

    router.put('reviews/:id', async (ctx) => {
      const { default: ProductReviewController } = await import(
        '#controllers/product_reviews_controller'
      )
      return new ProductReviewController().update(ctx)
    })

    router.delete('reviews/:id', async (ctx) => {
      const { default: ProductReviewController } = await import(
        '#controllers/product_reviews_controller'
      )
      return new ProductReviewController().destroy(ctx)
    })
  })
  .prefix('api/v1')

// Cart Routes with Auth Middleware
router
  .group(() => {
    router.get('/cart', async (ctx) => {
      const { default: CartController } = await import('#controllers/carts_controller')
      return new CartController().index(ctx)
    })

    router.post('/cart', async (ctx) => {
      const { default: CartController } = await import('#controllers/carts_controller')
      return new CartController().store(ctx)
    })

    router.put('/cart/:id', async (ctx) => {
      const { default: CartController } = await import('#controllers/carts_controller')
      return new CartController().update(ctx)
    })

    router.delete('/cart/:id', async (ctx) => {
      const { default: CartController } = await import('#controllers/carts_controller')
      return new CartController().destroy(ctx)
    })
  })
  .prefix('api/v1')
  .use(middleware.auth({})) // Added auth middleware only for cart routes

// Order Routes
router
  .group(() => {
    router.post('orders', async (ctx) => {
      const { default: OrderController } = await import('#controllers/orders_controller')
      return new OrderController().store(ctx)
    })

    router.get('orders', async (ctx) => {
      const { default: OrderController } = await import('#controllers/orders_controller')
      return new OrderController().index(ctx)
    })

    router.get('orders/:id', async (ctx) => {
      const { default: OrderController } = await import('#controllers/orders_controller')
      return new OrderController().show(ctx)
    })

    router.put('orders/:id', async (ctx) => {
      const { default: OrderController } = await import('#controllers/orders_controller')
      return new OrderController().update(ctx)
    })

    router.delete('orders/:id', async (ctx) => {
      const { default: OrderController } = await import('#controllers/orders_controller')
      return new OrderController().destroy(ctx)
    })

    router.get('orders-history', async (ctx) => {
      const { default: OrderController } = await import('#controllers/orders_controller')
      return new OrderController().orderHistory(ctx)
    })

    router.post('order-items', async (ctx) => {
      const { default: OrderItemController } = await import('#controllers/order_items_controller')
      return new OrderItemController().store(ctx)
    })

    router.get('order-items/:orderId', async (ctx) => {
      const { default: OrderItemController } = await import('#controllers/order_items_controller')
      return new OrderItemController().index(ctx)
    })

    router.get('order-items/:id', async (ctx) => {
      const { default: OrderItemController } = await import('#controllers/order_items_controller')
      return new OrderItemController().show(ctx)
    })

    router.put('order-items/:id', async (ctx) => {
      const { default: OrderItemController } = await import('#controllers/order_items_controller')
      return new OrderItemController().update(ctx)
    })

    router.delete('order-items/:id', async (ctx) => {
      const { default: OrderItemController } = await import('#controllers/order_items_controller')
      return new OrderItemController().destroy(ctx)
    })
  })
  .prefix('api/v1')

// TestapisController
router
  .group(() => {
    router.get('testapi', async (ctx) => {
      const { default: TestapisController } = await import('#controllers/testapis_controller')
      return new TestapisController().index(ctx)
    })
  })
  .prefix('api/v1')
//   .use(middleware.auth())
