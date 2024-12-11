import { HttpContext } from '@adonisjs/core/http'
import Order from '#models/order'
import OrderItem from '#models/order_item'


export default class OrderController {
  // Create a new order
  public async store({ request, response }: HttpContext) {
    const orderData = request.only(['userId', 'totalAmount', 'orderStatus', 'shippingAddress', 'billingAddress'])
    
    try {
      const order = await Order.create(orderData)
      return response.status(201).json({
        success: true,
        message: 'Order created successfully',
        data: order
      })
    } catch (error) {
      return response.status(500).json({
        success: false,
        message: 'Failed to create order',
        error: error.message
      })
    }
  }

  // Get all orders
  public async index({ response }: HttpContext) {
    try {
      const orders = await Order.query().preload('user').preload('orderItems')
      return response.status(200).json({
        success: true,
        data: orders
      })
    } catch (error) {
      return response.status(500).json({
        success: false,
        message: 'Failed to fetch orders',
        error: error.message
      })
    }
  }

  // Get a single order by ID
  public async show({ params, response }: HttpContext) {
    try {
      const order = await Order.query().where('id', params.id).preload('user').preload('orderItems').firstOrFail()
      return response.status(200).json({
        success: true,
        data: order
      })
    } catch (error) {
      return response.status(404).json({
        success: false,
        message: 'Order not found',
        error: error.message
      })
    }
  }

  // Update an existing order
  public async update({ params, request, response }: HttpContext) {
    const orderData = request.only(['totalAmount', 'orderStatus', 'shippingAddress', 'billingAddress'])
    
    try {
      const order = await Order.findOrFail(params.id)
      order.merge(orderData)
      await order.save()
      
      return response.status(200).json({
        success: true,
        message: 'Order updated successfully',
        data: order
      })
    } catch (error) {
      return response.status(500).json({
        success: false,
        message: 'Failed to update order',
        error: error.message
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
        message: 'Order deleted successfully'
      })
    } catch (error) {
      return response.status(500).json({
        success: false,
        message: 'Failed to delete order',
        error: error.message
      })
    }
  }
}
