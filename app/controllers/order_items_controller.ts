import { HttpContext } from '@adonisjs/core/http'
import OrderItem from '#models/order_item'

export default class OrderItemController {
  // Create a new order item
  public async store({ request, response }: HttpContext) {
    const orderItemData = request.only(['orderId', 'productId', 'quantity', 'priceAtTime'])
    
    try {
      const orderItem = await OrderItem.create(orderItemData)
      return response.status(201).json({
        success: true,
        message: 'Order item created successfully',
        data: orderItem
      })
    } catch (error) {
      return response.status(500).json({
        success: false,
        message: 'Failed to create order item',
        error: error.message
      })
    }
  }

  // Get all order items for a specific order
  public async index({ params, response }: HttpContext) {
    try {
      const orderItems = await OrderItem.query().where('orderId', params.orderId).preload('product')
      return response.status(200).json({
        success: true,
        data: orderItems
      })
    } catch (error) {
      return response.status(500).json({
        success: false,
        message: 'Failed to fetch order items',
        error: error.message
      })
    }
  }

  // Get a single order item by ID
  public async show({ params, response }: HttpContext) {
    try {
      const orderItem = await OrderItem.findOrFail(params.id)
      return response.status(200).json({
        success: true,
        data: orderItem
      })
    } catch (error) {
      return response.status(404).json({
        success: false,
        message: 'Order item not found',
        error: error.message
      })
    }
  }

  // Update an existing order item
  public async update({ params, request, response }: HttpContext) {
    const orderItemData = request.only(['quantity', 'priceAtTime'])
    
    try {
      const orderItem = await OrderItem.findOrFail(params.id)
      orderItem.merge(orderItemData)
      await orderItem.save()
      
      return response.status(200).json({
        success: true,
        message: 'Order item updated successfully',
        data: orderItem
      })
    } catch (error) {
      return response.status(500).json({
        success: false,
        message: 'Failed to update order item',
        error: error.message
      })
    }
  }

  // Delete an order item
  public async destroy({ params, response }: HttpContext) {
    try {
      const orderItem = await OrderItem.findOrFail(params.id)
      await orderItem.delete()
      
      return response.status(200).json({
        success: true,
        message: 'Order item deleted successfully'
      })
    } catch (error) {
      return response.status(500).json({
        success: false,
        message: 'Failed to delete order item',
        error: error.message
      })
    }
  }
}
