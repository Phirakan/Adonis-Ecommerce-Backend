import { HttpContext } from '@adonisjs/core/http'
import Order from '#models/order'
import OrderItem from '#models/order_item'
import Cart from '#models/cart'

export default class OrderController {
  // Create a new order
  public async store({ request, auth, response }: HttpContext) {
    try {
      await auth.authenticate()
      const user = auth.user! as { id: number }
      const { totalAmount, orderStatus, shippingAddress, billingAddress } = request.only([
        'totalAmount',
        'orderStatus',
        'shippingAddress',
        'billingAddress',
      ])

      const cartItems = await Cart.query().where('userId', user.id).preload('product')
      if (cartItems.length === 0) {
        return response.status(400).json({
          success: false,
          message: 'Cart is empty. Please add items to the cart.',
        })
      }

      const order = await Order.create({
        userId: user.id,
        totalAmount,
        orderStatus,
        shippingAddress,
        billingAddress,
      })

      // Save the order items (cart items)
      for (let item of cartItems) {
        await OrderItem.create({
          orderId: order.id,
          productId: item.productId,
          quantity: item.quantity,
          priceAtTime: item.product.price, // Use the price from the associated product
        })
      }

      // Clear the user's cart after placing the order
      await Cart.query().where('userId', user.id).delete()

      return response.status(201).json({
        success: true,
        message: 'Order placed successfully',
        data: order,
      })
    } catch (error) {
      return response.status(500).json({
        success: false,
        message: 'Failed to create order',
        error: error.message,
      })
    }
  }

  // Get all orders with order items and product details
  public async index({ response }: HttpContext) {
    try {
      const orders = await Order.query()
        .preload('orderItems', (orderItemsQuery) => {
          orderItemsQuery.preload('product') // preload product details with each order item
        })
        .orderBy('createdAt', 'desc') // Optional, if you want to sort by date
      return response.status(200).json({
        success: true,
        data: orders,
      })
    } catch (error) {
      return response.status(500).json({
        success: false,
        message: 'Failed to fetch orders',
        error: error.message,
      })
    }
  }

  // Get a specific order by ID with its items and products
  public async show({ params, response }: HttpContext) {
    try {
      const order = await Order.findOrFail(params.id)
      await order.load('orderItems', (orderItemsQuery) => {
        orderItemsQuery.preload('product') // preload the product details
      })
      return response.status(200).json({
        success: true,
        data: order,
      })
    } catch (error) {
      return response.status(404).json({
        success: false,
        message: 'Order not found',
        error: error.message,
      })
    }
  }

  // Update an existing order
  public async update({ params, request, response }: HttpContext) {
    const { orderStatus, trackingNumber, courierName } = request.only([
      'orderStatus',
      'trackingNumber',
      'courierName',
    ])

    try {
      const order = await Order.findOrFail(params.id)

      // กรณีที่สถานะเป็น "กำลังจัดส่ง" หรือ "พัสดุจัดส่งสำเร็จ"
      if (orderStatus === 'shipped') {
        // ตรวจสอบว่าเลขพัสดุและชื่อขนส่งถูกส่งมาหรือไม่
        if (!trackingNumber || !courierName) {
          return response.status(400).json({
            success: false,
            message:
              'Tracking number and courier name are required when shipping in progress or shipped.',
          })
        }
        order.trackingNumber = trackingNumber // เก็บเลขพัสดุ
        order.courierName = courierName // เก็บชื่อขนส่ง
      }

      // อัพเดตสถานะของคำสั่งซื้อ
      order.orderStatus = orderStatus

      // บันทึกการอัพเดต
      await order.save()

      return response.status(200).json({
        success: true,
        message: 'Order status updated successfully',
        data: order,
      })
    } catch (error) {
      return response.status(500).json({
        success: false,
        message: 'Failed to update order',
        error: error.message,
      })
    }
  }

  // Delete an order
  public async destroy({ params, response }: HttpContext) {
    try {
      const order = await Order.findOrFail(params.id)
      await order.delete()

      return response.status(200).json({
        success: true,
        message: 'Order deleted successfully',
      })
    } catch (error) {
      return response.status(500).json({
        success: false,
        message: 'Failed to delete order',
        error: error.message,
      })
    }
  }
  // Get all orders for a specific user (Order History)
  public async orderHistory({ auth, response }: HttpContext) {
    try {
      await auth.authenticate()
      const user = auth.user!

      // Check if the user is an admin
      const isAdmin = user.role === 'admin'

      let ordersQuery = Order.query()
        .preload('orderItems', (orderItemsQuery) => {
          orderItemsQuery.preload('product')
        })
        .orderBy('createdAt', 'desc')

      if (isAdmin) {
        // If admin, load orders with user details
        ordersQuery = ordersQuery.preload('user', (userQuery) => {
          userQuery.select(['id'])
        })
      } else {
        // If not admin, only load user's own orders
        ordersQuery = ordersQuery.where('userId', user.id).preload('user', (userQuery) => {
          userQuery.select(['id'])
        })
      }

      const orders = await ordersQuery

      return response.status(200).json({
        success: true,
        isAdmin,
        data: orders,
      })
    } catch (error) {
      return response.status(500).json({
        success: false,
        message: 'Failed to fetch order history',
        error: error.message,
      })
    }
  }
}
